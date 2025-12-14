const isEmpty = name => {
  return value => {
    if (typeof value === 'undefined' || value === null || value === '') {
      return name + ' is required.';
    }
    return true;
  };
};

const fs = require('fs');

module.exports = function (plop) {
  // Base Component Generator
  plop.setGenerator('Base Component', {
    description: 'Create a new React component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Base Component name:',
        validate: isEmpty('name'),
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/components/base/{{pascalCase name}}/{{pascalCase name}}.jsx',
        templateFile: 'plop-templates/component.jsx',
      },
    ],
  });

  // Component Generator
  plop.setGenerator('Component', {
    description: 'Create a new React component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Component name:',
        validate: isEmpty('name'),
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.jsx',
        templateFile: 'plop-templates/component.jsx',
      },
    ],
  });

  // Ctr Generator
  const { pascalCase } = require('change-case');
  const fs = require('fs');

  function isEmpty(name) {
    return (value) => {
      if (!value || value.trim() === '') {
        return `${name} is required`;
      }
      return true;
    };
  }

  //react-route
  plop.setGenerator('React-route', {
    description: 'Create a new React container and add it as a route under App layout',
    prompts: [
      {
        type: 'input',
        name: 'routePath',
        message: 'Enter Route Path (e.g. /dashboard):',
        filter: (value) => (value.startsWith('/') ? value : '/' + value),
      },
      {
        type: 'input',
        name: 'routeCtr',
        message: 'Enter Route Container name (e.g. Dashboard):',
        validate: (value) => (value && value.trim() !== '') || 'routeCtr is required',
      },
    ],
    actions: [
      // Add controller files
      {
        type: 'add',
        path: 'src/containers/{{pascalCase routeCtr}}/{{pascalCase routeCtr}}CTR.jsx',
        templateFile: 'plop-templates/ctr.jsx',
      },
      {
        type: 'add',
        path: 'src/containers/{{pascalCase routeCtr}}/{{pascalCase routeCtr}}MainCtr.jsx',
        templateFile: 'plop-templates/mainCtr.jsx',
      },

      // Insert import for new route
      {
        type: 'modify',
        path: 'src/routes.jsx',
        transform: (fileContent, { routeCtr }) => {
          const importName = `${pascalCase(routeCtr)}MainCtr`;
          const importPath = `./containers/${pascalCase(routeCtr)}/${importName}.jsx`;
          const importStatement = `import ${importName} from '${importPath}';`;

          const lines = fileContent.split('\n');
          const lastImportIndex = lines.reduce(
            (lastIdx, line, idx) => (line.startsWith('import ') ? idx : lastIdx),
            -1
          );

          const alreadyExists = lines.some((line) => line.includes(importPath));
          if (alreadyExists) return fileContent;

          lines.splice(lastImportIndex + 1, 0, importStatement);
          return lines.join('\n');
        },
      },

      // Insert App import if missing
      {
        type: 'modify',
        path: 'src/routes.jsx',
        transform: (fileContent) => {
          if (!fileContent.includes(`import App from './App.jsx';`)) {
            const lines = fileContent.split('\n');
            const lastImportIndex = lines.reduce(
              (lastIdx, line, idx) => (line.startsWith('import ') ? idx : lastIdx),
              -1
            );
            lines.splice(lastImportIndex + 1, 0, `import App from './App.jsx';`);
            return lines.join('\n');
          }
          return fileContent;
        },
      },

      // Append route to App layout
      {
        type: 'modify',
        path: 'src/routes.jsx',
        transform: function (fileContent, { routePath, routeCtr }) {
          const pathWithoutSlash = routePath.replace(/^\//, '');
          const componentName = `${pascalCase(routeCtr)}MainCtr`;

          const newRoute = `{
              path: '${pathWithoutSlash}',
              element: <${componentName} />,
            },`;

          const lines = fileContent.split('\n');

          let insideAppRoute = false;
          let childrenStartIndex = -1;
          let childrenEndIndex = -1;

          for (let i = 0; i < lines.length; i++) {
            const line = lines[i];

            if (!insideAppRoute && line.includes('element: <App')) {
              insideAppRoute = true;
            }

            if (insideAppRoute && line.includes('children: [')) {
              childrenStartIndex = i + 1;
            }

            if (insideAppRoute && childrenStartIndex !== -1 && line.includes(']')) {
              childrenEndIndex = i;
              break;
            }
          }

          if (childrenStartIndex === -1 || childrenEndIndex === -1) {
            throw new Error('Could not find App layout route with children array in routes.jsx');
          }

          // Check if route already exists
          const existingRoute = lines
            .slice(childrenStartIndex, childrenEndIndex)
            .some((line) => line.includes(`path: '${pathWithoutSlash}'`));

          if (existingRoute) {
            return fileContent; // Avoid duplicate
          }

          // Insert new route just before the closing bracket
          lines.splice(childrenEndIndex, 0, `      ${newRoute}`);

          return lines.join('\n');
        },
      }
    ],
  });

  //Stores
  plop.setGenerator('Store', {
    description: 'Create a MobX store and register it in RootStore',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Store name (e.g., Dashboard):',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/store/{{pascalCase name}}Store.js',
        templateFile: 'plop-templates/store.jsx',
      },

      {
        type: 'modify',
        path: 'src/store/RootStore.js',
        transform: (fileContent, { name }) => {
          const importName = plop.renderString('{{pascalCase name}}Store', { name });
          const importPath = `./${importName}`;
          const importStatement = `import ${importName} from '${importPath}';\n`;

          const lines = fileContent.split('\n');

          const lastImportIndex = lines.reduce((lastIdx, line, idx) =>
            line.startsWith('import ') ? idx : lastIdx, -1
          );

          const alreadyExists = lines.some(line => line.includes(importPath));
          if (alreadyExists) return fileContent;

          lines.splice(lastImportIndex + 1, 0, importStatement);

          return lines.join('\n');
        },
      },

      {
        type: 'modify',
        path: 'src/store/RootStore.js',
        transform: (fileContent, { name }) => {
          const pascalName = plop.renderString('{{pascalCase name}}', { name });
          const storeClassName = `${pascalName}Store`; // e.g. UserStore
          const propertyName = storeClassName;         // Same name as class

          const constructorRegex = /constructor\s*\(\)\s*{([\s\S]*?)}/m;
          const match = fileContent.match(constructorRegex);

          if (!match) throw new Error('No constructor() found in RootStore');

          const constructorBody = match[1];

          const newLine = `    this.${propertyName} = new ${storeClassName}();`;

          // Avoid duplication
          if (constructorBody.includes(`this.${propertyName}`)) return fileContent;

          const newConstructor = `constructor() {\n${newLine}\n${constructorBody}}`;

          return fileContent.replace(constructorRegex, newConstructor);
        },
      }
    ],
  });



};
