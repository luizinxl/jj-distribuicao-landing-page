$content = Get-Content -Raw -Encoding UTF8 'C:\Users\SANSUNG\.gemini\antigravity-ide\scratch\jj-distribuicao-landing-page\index.html'

$replacements = @{
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCBExGI_OzMbMI0OU5LGTcQ71q5syDLByYZ5vnCJnlJA8EevnPa4lHef7l2CaJX5b9uU_T1OEKnSQYY7TC8h9fYO4MgPNKaVeVVWbeu2feWU8QyhuOgl9DIAWvj8lDxLShFUXAjZzZJlMuTActjrLyG0QyAPrHITlMEmz1FODYJMViYIfmxnuAamRtd2yQcaz_v3xt8gMiuBLQrX_D87kUZMw79BfBxVkNotvDborK45wfChqeoKmMzXPhiqx0kq_0' = './images/logo.png'
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCIGR1-itGhUo0FV_7kp0WEISdOB4j-Mm5eQcuv5i5Ho1L-9zf0Afk9ZDuIPJrlmRbm8ZXTB1cHgxL00lzqB_dVsjKXvHD-URxHZByX_JGJH5juRyQSqaF72IpY7N3PO9MNjjRmzaow_-Jg-_TJ-U04LnSG-UbaRpR3uBJeO6VA10G2i1zMnKlL0ol04WNasFaIfz3kUgMeSg9q1R-Coi_SizfABGHtwMs-jqRt' = './images/hero-balcao.png'
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCliY-PCrWbPscdP4eecwaEqQMgeRLru3Y1w-CaSVM6O_qavY8OTVJpBk9m4NrSrzBN6KTm65ApkOmnaHKuGLTO9rmCfFMtcAyrDGe-pfBsZEIlKNXRNvG6OLUGfJthjW9f5A18ZK8pZTeSCDhkLjeYu99qmPqvNZKSorxCW0evNyiZ_GWprStv1VYmEIPOEHtOuruZLxcN6TckLnR_P2QHNQLycfJL2PoDqsKc' = './images/tintas-vernizes.png'
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDTWOSsANkjsmt3m-UYvCe12QOwwhhwNmZXDsrBbvfHD1To3bHCbQsOUpP0S_XzHS6wnLhICcflLqNLyUBahoqueR-gLlcwJolF4ph8mISYLJn2dIKnPLBw4Xgibzt80cclEdf_KO9PAbYsBVLlDRE0FiFH3OH_0182KrDUsZOR92ha8YeIRpS3-FNTaL-D5zbdk1vS3gootoofOVLeBN7DmCkY6V1CXsoWGeIs' = './images/preparacao-massas.png'
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBr2wKYu0Geb4G54YV1KEGQPUfNgsrRC69bnETha3K3WizNHaktvWWjpXr9pg3sAmcp3UkxHj7HJVN2-QmFF5Ij7HlO2AtYr7lK-b_utbcxZ9lJtmts51U3AkjOqm4HLO27cCkgJ2XmLPoYRf5T9TaE40rMFSzq8gbtyBIaDJqUL5ywdXVg0FrC8oH10iBzrTYOCjginyPa7lrhriKziS1RjBIJAkGnP4gF-r5c' = './images/lixas-abrasivos.png'
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAnxEOKF_53zw0C3L6hTTKjBNgKsA_Uvv-O3FFt0CAr3oTCXb9C-ldRp79FZGmFMiCbL5_omIeqX2W-8EGuRm4F__rF6w6jajftiJiCisJ87PyUE8G2XMbeu4fs0-MD837e83obk1wM61XQsLfOaZDAReBihmjP1MRvQ-4htS0N5GwvHzolheU4dNdeaCdhZr6PeJSvFZeNVCjObgLuMCcRHHnCqDBz4Tjnsptt' = './images/equipamentos-polimento.png'
}

foreach ($entry in $replacements.GetEnumerator()) {
    $content = $content.Replace($entry.Key, $entry.Value)
}

Set-Content -Path 'C:\Users\SANSUNG\.gemini\antigravity-ide\scratch\jj-distribuicao-landing-page\index-local.html' -Value $content -Encoding UTF8
Write-Host 'Created index-local.html successfully'
