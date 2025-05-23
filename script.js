function calculateMaxSpend() {
    const opInput = document.getElementById("operatingLoss");
    const trInput = document.getElementById("transferIncome");
    const exInput = document.getElementById("excludableSpend");
    const fundInput = document.getElementById("ownerFunding");

    const X = parseFloat(opInput.value) || 0;
    const Y = parseFloat(trInput.value) || 0;
    const Z = parseFloat(exInput.value) || 0;
    const F = parseFloat(fundInput.value) || 0;

    const allEmpty = !opInput.value && !trInput.value && !exInput.value && !fundInput.value;

    const maxSpend = (105000000 - 3 * X + 3 * Z + F + 3 * Y) / 3;

    const formatted = allEmpty
        ? "0"
        : maxSpend.toLocaleString('en-GB', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

    document.getElementById("maxSpend").innerText = formatted;
}

document.querySelectorAll("input").forEach(input => {
    input.addEventListener("input", calculateMaxSpend);
});

// Initialize result on page load
calculateMaxSpend();

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
