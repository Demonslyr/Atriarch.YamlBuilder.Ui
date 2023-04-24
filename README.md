# K8s YAML Generator

K8s YAML Generator is a React application that simplifies the process of creating Kubernetes configuration YAML files. It provides a user-friendly interface that guides developers through creating various Kubernetes resources, including deployments, services, horizontal pod autoscalers, ingresses, config maps, and secrets.

This project used ai for most code generation.

## Project Structure

The project is organized as follows:
```
src/
├── components/
│ ├── ArbitraryYamlForm.tsx
│ ├── ConfigMapForm.tsx
│ ├── DeploymentForm.tsx
│ ├── HpaForm.tsx
│ ├── IngressForm.tsx
│ ├── SecretForm.tsx
│ └── ServiceForm.tsx
├── App.css
├── App.module.css
├── App.tsx
├── index.css
├── index.tsx
├── react-app-env.d.ts
├── reportWebVitals.ts
└── setupTests.ts
```

- `src/components/`: Contains the individual form components for each Kubernetes resource.
- `src/App.tsx`: Main application file that brings all components together and generates the final YAML configuration.

## Prerequisites

Ensure you have the following installed on your local machine:

- [Node.js](https://nodejs.org/) (v12 or higher)
- [npm](https://www.npmjs.com/) (v6 or higher)

## Running the App Locally

To run the app locally, follow these steps:

1. Clone the repository:

```
git clone https://github.com/yourusername/k8s-yaml-generator.git
cd k8s-yaml-generator
```

2. Install the dependencies:

```
npm install
```

3. Start the development server:

```
npm start
```

4. Open your web browser and visit [http://localhost:3000](http://localhost:3000) to see the app in action.

## Testing

To run the tests, execute the following command:

```
npm test
```

## Building for Production

To build the app for production, run:

```
npm run build
```

The compiled assets will be located in the `build/` directory, which you can deploy to your desired hosting environment.

## Linting and Formatting

The project uses [ESLint](https://eslint.org/) with [Airbnb's style guide](https://github.com/airbnb/javascript) and [Prettier](https://prettier.io/) for code formatting.

To run the linter, use:

```
npm run lint
```

To automatically fix linting and formatting issues, run:

```
npm run lint:fix
```


## Contributing

Contributions are welcome! If you find a bug or have a feature request, please open an issue. If you'd like to contribute code, please fork the repository and submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
