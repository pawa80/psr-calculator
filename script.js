function getRawNumber(el) {
    return parseFloat(el.value.replace(/,/g, "")) || 0;
}

function calculateMaxSpend() {
    const opInput = document.getElementById("operatingLoss");
    const trInput = document.getElementById("transferIncome");
    const exInput = document.getElementById("excludableSpend");
    const fundInput = document.getElementById("ownerFunding");

    const X = getRawNumber(opInput);
    const Y = getRawNumber(trInput);
    const Z = getRawNumber(exInput);
    const F = getRawNumber(fundInput);

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

document.querySelectorAll("#calculator input").forEach(input => {
    input.addEventListener("input", calculateMaxSpend);

    input.addEventListener("focus", e => {
        e.target.value = e.target.value.replace(/,/g, "");
    });

    input.addEventListener("blur", e => {
        const val = e.target.value.replace(/,/g, "");
        if (val === "") return;
        const num = parseFloat(val);
        if (!isNaN(num)) {
            e.target.value = num.toLocaleString('en-GB', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            });
        }
    });
});

// Initialize result on page load
calculateMaxSpend();

function downloadCSV() {
    const opInput = document.getElementById("operatingLoss");
    const trInput = document.getElementById("transferIncome");
    const exInput = document.getElementById("excludableSpend");
    const fundInput = document.getElementById("ownerFunding");

    const X = getRawNumber(opInput);
    const Y = getRawNumber(trInput);
    const Z = getRawNumber(exInput);
    const F = getRawNumber(fundInput);
    const maxSpend = document.getElementById("maxSpend").innerText;

    const csv = `Operating Loss,Transfer Income,Excludable Spend,Owner Funding,Max Transfer Spend\n${X},${Y},${Z},${F},${maxSpend}`;
    const blob = new Blob([csv], { type: 'text/csv' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "psr_transfer_spend.csv";
    link.click();
}
