param()
$ErrorActionPreference = "Continue"
Set-Location -LiteralPath (Split-Path -Parent $PSScriptRoot | Split-Path -Parent)

function Has-Command {
    param([string]$Cmd)
    return [bool](Get-Command $Cmd -ErrorAction SilentlyContinue)
}

function Has-File {
    param([string]$Path)
    return (Test-Path -LiteralPath $Path)
}

function Has-NpmScript {
    param([string]$Name)
    if (-not (Test-Path package.json)) { return $false }
    try {
        $pkg = Get-Content package.json -Raw
        return ($pkg -match ('"' + [regex]::Escape($Name) + '"\s*:'))
    } catch {
        return $false
    }
}

function Run-Step {
    param([string]$Label,[string]$Command)

    Write-Host "[auto] $Label"
    $p = Start-Process cmd.exe -ArgumentList "/c $Command" -PassThru -NoNewWindow
    if (-not $p.WaitForExit(900000)) {
        try { $p.Kill() } catch {}
        Write-Host "[auto] timeout: $Label" -ForegroundColor Red
        return $false
    }
    return ($p.ExitCode -eq 0)
}

$failed = $false

if (Has-File "package.json") {
    if (Has-NpmScript "lint") {
        if (-not (Run-Step "npm run lint" "npm run lint")) { $failed = $true }
    }
    if (-not $failed -and (Has-NpmScript "typecheck")) {
        if (-not (Run-Step "npm run typecheck" "npm run typecheck")) { $failed = $true }
    }
    if (-not $failed -and (Has-NpmScript "test")) {
        if (-not (Run-Step "npm test" "npm test")) { $failed = $true }
    }
}
elseif (Has-File "pyproject.toml" -or Has-File "requirements.txt") {
    if (Has-Command "pytest") {
        if (-not (Run-Step "pytest" "pytest")) { $failed = $true }
    }
}
elseif (Has-File "Cargo.toml") {
    if (-not (Run-Step "cargo test" "cargo test")) { $failed = $true }
}
elseif (Has-File "go.mod") {
    if (-not (Run-Step "go test ./..." "go test ./...")) { $failed = $true }
}

if ($failed) {
    Write-Host "[auto] validation failed" -ForegroundColor Red
    exit 1
}

Write-Host "[auto] validation passed" -ForegroundColor Green
exit 0
