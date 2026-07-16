# **App Name**: VarModel

## Core Features:

- Variable Generation: Accept user-defined 3D positional input and automatically create variable names that reference this positional data. These variables should adhere to common coding standards and best practices, providing clarity and maintainability in the generated code.
- Language Compatibility: Tool functionality can produce valid variables for multiple coding languages such as Javascript, Python, C++, etc. These language targets are determined via explicit user inputs that parameterize a large language model.
- Code Output Formatting: The application should generate clean, well-formatted code snippets ready for integration into existing projects, thus avoiding common issues and ensuring smooth compatibility.
- Real-Time Preview: Offer a real-time preview or simulation of the generated 3D variable model within a 3D visualizer, enabling users to visualize and adjust the model dynamically based on the defined variables. Would be good to show an interactive normal distribution. when highlighted over, it shows value of the portfolio and loss/gain
- Simulation Method Selection: User selects parametric or historical simulation method of calculation
- Instrument Addition: User can add a new instrument by selecting from a dropdown list of available symbols and entering the position in USD.
- VaR Calculation and Display: Calculate and display VaR results including Absolute VaR, Relative VaR, VaR % of NAV, Marginal VaR, Component VaR, and Conditional VaR.
- VaR Model Backend: Calculate Value at Risk using python and SQL with market data, portfolio data, and model settings as inputs. Default confidence interval is 95%.

## Style Guidelines:

- Primary color: Deep blue (#2E3192), evokes technology and precision.
- Background color: Light gray (#E0E0E0), for a clean and professional feel.
- Accent color: Teal (#008080), to highlight important elements and calls to action.
- Font: 'Inter', a grotesque-style sans-serif with a modern, machined, objective, neutral look, used for both headlines and body text.
- Use simple, geometric icons representing points, lines, and coordinate systems.
- Maintain a structured and logical layout with clear sections for input, preview, and code output.
- Use subtle transitions and highlights to guide users through the process of defining points and generating code.