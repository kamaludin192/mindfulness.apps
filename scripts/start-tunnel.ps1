# Auto-reconnect tunnel runner for demoing
Write-Host "Starting persistent tunnel..."
while ($true) {
    ssh -R 80:localhost:3000 -o StrictHostKeyChecking=no -o ServerAliveInterval=15 -o ServerAliveCountMax=6 nokey@localhost.run
    Write-Host "Tunnel disconnected. Reconnecting in 2 seconds..."
    Start-Sleep -Seconds 2
}
