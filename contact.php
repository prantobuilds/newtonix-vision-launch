<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$RESEND_API_KEY = 're_7vAmV6RG_Kuf2AsFRoHHL1Zpic7Ku7yNZ';

try {
    $input = json_decode(file_get_contents('php://input'), true);

    if (!$input || !isset($input['name']) || !isset($input['email']) || !isset($input['phone'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing required fields']);
        exit;
    }

    $payload = [
        'from' => 'noreply@newtonixtech.com',
        'to' => 'samiul.pranto@viserx.net',
        'subject' => 'New project inquiry from ' . $input['name'],
        'html' => sprintf(
            '<h2>New Project Inquiry</h2>
            <p><strong>Name:</strong> %s</p>
            <p><strong>Email:</strong> %s</p>
            <p><strong>Phone:</strong> %s</p>
            <p><strong>Company:</strong> %s</p>
            <p><strong>Service:</strong> %s</p>
            <p><strong>Details:</strong></p>
            <p>%s</p>',
            htmlspecialchars($input['name']),
            htmlspecialchars($input['email']),
            htmlspecialchars($input['phone']),
            htmlspecialchars($input['company'] ?? ''),
            htmlspecialchars($input['service'] ?? ''),
            nl2br(htmlspecialchars($input['details'] ?? ''))
        ),
        'reply_to' => $input['email']
    ];

    $ch = curl_init('https://api.resend.com/emails');
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => json_encode($payload),
        CURLOPT_HTTPHEADER => [
            'Content-Type: application/json',
            'Authorization: Bearer ' . $RESEND_API_KEY
        ]
    ]);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($httpCode !== 200) {
        $error = json_decode($response, true);
        http_response_code(400);
        echo json_encode(['error' => $error['message'] ?? 'Failed to send email']);
        exit;
    }

    echo json_encode(['success' => true, 'message' => 'Inquiry sent successfully']);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>