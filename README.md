# ✨ OmniCalc ✨

> Your all-in-one calculation powerhouse, built for precision and designed for clarity.

<!-- Optional: Add a GIF/Screenshot of the app in action here -->
<!-- e.g., <p align="center"><img src="docs/omni-calc-preview.gif" alt="OmniCalc Preview" width="700"></p> -->

OmniCalc is a modern, feature-rich calculator application designed to cater to a wide range of calculation needs, from simple arithmetic to complex financial and scientific computations. With its intuitive interface and comprehensive functionality, OmniCalc aims to be the go-to calculator for students, professionals, and everyday users.

## 🚀 Core Features

- 🔢 **Basic Calculations:** Perform everyday arithmetic operations (addition, subtraction, multiplication, division) with ease.
- 🔬 **Advanced Functions:** Access scientific functions including square root, exponents, logarithms, and trigonometry.
- ⚖️ **Unit Converter:** Seamlessly convert between various units for length, mass, time, and temperature.
- 💰 **Financial Calculations:** Quickly calculate percentages, discounts, tips, and markups.
- 📅 **Date Calculations:** Determine date differences or add/subtract days from a specific date.
- ⏱️ **Time Calculations:** Perform arithmetic on time durations and convert between time units.
- 🧮 **Equation Solver:** Solve linear and quadratic equations.
- 💡 **Formula Explainer (AI):** Understand numerical formulas with AI-powered explanations, including their likely application areas.

## 🛠️ Tech Stack

OmniCalc is built with a modern and robust technology stack:

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **UI Library:** [React](https://reactjs.org/)
- **UI Components:** [ShadCN UI](https://ui.shadcn.com/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **AI Functionality:** [Genkit (Google AI)](https://firebase.google.com/docs/genkit)
- **Icons:** [Lucide React](https://lucide.dev/)

## ✨ Design Philosophy

OmniCalc embraces a **mature, modern, and minimalistic UI**:

- **Primary Color:** Soft purple (`#A691C9`) - Intellectual yet approachable.
- **Background Color:** Very light purple (`#F0EDF4`) - Gentle and non-distracting.
- **Accent Color:** Light blue (`#74B4E0`) - Highlights interactive elements.
- **Typography:**
  - Headlines: 'Space Grotesk' (Tech-inspired, modern)
  - Body: 'Inter' (Readability, clean aesthetic)
  - Code/Formulas: 'Source Code Pro'
- **User Experience:** Responsive layout with subtle animations for a smooth and enhanced interaction.

## ⚙️ Getting Started

To get OmniCalc running locally:

1.  **Clone the repository:**
    Replace `your-username/your-repository-name.git` with your actual repository URL.
    ```bash
    git clone https://github.com/your-username/your-repository-name.git
    cd your-repository-name
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Set up environment variables (for AI features):**
    Create a `.env` file in the root of your project (you can copy `.env.example` if it exists, or create it from scratch). Add your Google AI API key:

    ```env
    # .env
    GOOGLE_API_KEY=YOUR_GOOGLE_AI_API_KEY
    ```

    You can obtain a Google AI API key from [Google AI Studio](https://aistudio.google.com/app/apikey).

4.  **Run the development server:**
    This command starts the Next.js development server.

    ```bash
    npm run dev
    ```

    The application will typically be available at `http://localhost:9002`.

5.  **(Optional) Run Genkit developer UI (for testing AI flows separately):**
    If you want to test or debug Genkit flows directly, you can run the Genkit developer UI in a separate terminal:
    ```bash
    npm run genkit:dev
    ```
    This usually starts on `http://localhost:4000`.

## 🤝 Contributing

Contributions are welcome! If you have ideas for improvements or bug fixes, please feel free to:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/YourAmazingFeature`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
5.  Push to the branch (`git push origin feature/YourAmazingFeature`).
6.  Open a Pull Request.

## 📄 License

This project is currently not licensed. You can add a license file (e.g., `LICENSE.md`) if you choose to. Common choices include MIT, Apache 2.0, or GPL.

---

We hope you find OmniCalc useful and intuitive!
