$app = get-wmiobject Win32_Product | Where-Object {$_.IdentifyingNumber -eq '{AC76BA86-7AD7-1036-7B44-AC0F074E4100}'}
$app.Uninstall()
"Application removed"