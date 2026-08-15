# Simple PowerShell HTTP Server for Gobika's Portfolio Website
param(
    [int]$Port = 5500,
    [string]$Path = $PSScriptRoot
)

$listener = New-Object System.Net.HttpListener
$url = "http://localhost:$Port/"
$listener.Prefixes.Add($url)

try {
    $listener.Start()
    Write-Host "===========================================================" -ForegroundColor Cyan
    Write-Host " 🚀 Portfolio Web Server is Live!" -ForegroundColor Green
    Write-Host " Local URL: $url" -ForegroundColor Yellow
    Write-Host " Serving Files From: $Path" -ForegroundColor White
    Write-Host " Press Ctrl+C to stop the server." -ForegroundColor Gray
    Write-Host "===========================================================" -ForegroundColor Cyan

    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $reqUrl = $request.Url.LocalPath
        if ($reqUrl -eq '/' -or $reqUrl -eq '') {
            $reqUrl = '/index.html'
        }

        # Clean relative path
        $relPath = $reqUrl.TrimStart('/').Replace('/', [System.IO.Path]::DirectorySeparatorChar)
        $filePath = Join-Path $Path $relPath

        if (Test-Path $filePath -PathType Leaf) {
            $contentBytes = [System.IO.File]::ReadAllBytes($filePath)
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()

            $contentType = switch ($ext) {
                ".html" { "text/html; charset=utf-8" }
                ".css"  { "text/css; charset=utf-8" }
                ".js"   { "application/javascript; charset=utf-8" }
                ".json" { "application/json; charset=utf-8" }
                ".png"  { "image/png" }
                ".jpg"  { "image/jpeg" }
                ".jpeg" { "image/jpeg" }
                ".svg"  { "image/svg+xml" }
                ".pdf"  { "application/pdf" }
                ".ico"  { "image/x-icon" }
                default { "application/octet-stream" }
            }

            $response.ContentType = $contentType
            $response.ContentLength64 = $contentBytes.Length
            $response.StatusCode = 200
            $response.OutputStream.Write($contentBytes, 0, $contentBytes.Length)
        } else {
            $response.StatusCode = 404
            $errMessage = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found: $reqUrl")
            $response.OutputStream.Write($errMessage, 0, $errMessage.Length)
        }

        $response.OutputStream.Close()
    }
}
catch {
    Write-Host "Server stopped or encountered an error: $_" -ForegroundColor Red
}
finally {
    if ($listener.IsListening) {
        $listener.Stop()
    }
    $listener.Close()
}
