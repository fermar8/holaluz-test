
## Hexagonal Arquitecture Application

 - Infrastructure layer: **Adapters** used for the different types of files. Since it is a command line application I have the **main.ts** as the entry point but there are no validations done like you would have with routes, a controller and some middleware.
 - Domain layer: **Factory** building the adapter depending on the file type, **Model** with the interface used, in this case *Reading* and **Service** with the logic used in the application, in our case I have only a *ReadingService*. 
 - Use Cases layer: Concrete **UseCases** used in the application. For this task we have *ProcessReadingsUseCase* which uses the domain layer to output the solution.


## Run on local

Install dependencies
```javascript
npm i
```

Build the project 

```javascript
npm run build
```

Run the project. For simplicity I added the files at the root of the project.
```javascript
npm run start:dev <file-to-read>
```

## Run on docker

```javascript
docker build -t holaluz-test .
docker run holaluz-test <file-to-read>
```

## Run tests

```javascript
npm run test:verbose
```

## Output test coverage

```javascript
npm run test:coverage
```


