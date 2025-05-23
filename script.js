function calculateMaxSpend() {
    const X = parseFloat(document.getElementById("operatingLoss").value) || 0;
    const Y = parseFloat(document.getElementById("transferIncome").value) || 0;
    const Z = parseFloat(document.getElementById("excludableSpend").value) || 0;
    const F = parseFloat(document.getElementById("ownerFunding").value) || 0;

    const maxSpend = (105000000 - 3 * X + 3 * Z + F + 3 * Y) / 3;
    const formatted = maxSpend.toLocaleString('en-GB', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    document.getElementById("maxSpend").innerText = formatted;
}

document.querySelectorAll("input").forEach(input => {
    input.addEventListener("input", calculateMaxSpend);
});

function downloadCSV() {
    const X = document.getElementById("operatingLoss").value;
    const Y = document.getElementById("transferIncome").value;
    const Z = document.getElementById("excludableSpend").value;
    const F = document.getElementById("ownerFunding").value;
    const maxSpend = document.getElementById("maxSpend").innerText;

    const csv = `Operating Loss,Transfer Income,Excludable Spend,Owner Funding,Max Transfer Spend\n${X},${Y},${Z},${F},${maxSpend}`;
    const blob = new Blob([csv], { type: 'text/csv' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "psr_transfer_spend.csv";
    link.click();
}
