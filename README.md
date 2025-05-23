# Premier League PSR Transfer Spend Calculator

This lightweight web tool helps you estimate how much a Premier League football club can spend on player transfers without breaching the league's **£105 million loss limit over three years**, also known as the **Profit and Sustainability Rules (PSR)**.

---

## 🔢 Formula Used

The calculator uses the following formula:

```
Max Transfer Spend per Year = (105,000,000 - 3 × Operating Loss + 3 × Excludable Spend + Owner Funding + 3 × Transfer Income) / 3
```

### Inputs:
- **Operating Loss (£)** – Total football-related expenses minus income (excludes transfer revenue)
- **Transfer Income (£)** – Annual revenue from player sales
- **Excludable Spend (£)** – Youth academy, women’s football, community programs, infrastructure
- **Owner Funding (£)** – Cash injected over 3 years by the club's owners (e.g., equity or covered debt)

---

## 💻 How to Use

1. Go to: [https://pwaagbo.github.io/psr-calculator/](https://pawa80.github.io/psr-calculator/) *(or your GitHub Pages URL)*
2. Enter financial values into each field.
3. The result updates live.
4. Download the output as a CSV if needed.

---

## 🛠 Tech Stack
- **HTML** (structure)
- **CSS** (styling)
- **Vanilla JS** (logic)
- Fully client-side – no backend required

---

## 📄 License
MIT – open for use, modification, and deployment.

---

## 🚀 Future Improvements (optional)
- Support for multiple-year entry
- Data validation warnings
- Historical comparison tool

---

Created with purpose by [@pwaagbo](https://github.com/pwaagbo) to better understand financial strategy in football.
