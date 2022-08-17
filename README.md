# TALKING-CLOCK

To get started clone the repo and run `npm install`.
you can run tests with `npm run tests` or run the API with `npm run start:api`.

You can debug the CLI by selecting the 'Debug CLI' launch option in the RUN AND DEBUG section of VSCode.
You can debug the tests by selecting the 'Jest file' launch option in the RUN AND DEBUG section of VSCode.

## CLI

Running `npm run start` will run the CLI and output the current time in 'human friendly' format.
You can also pass in an argument to the CLI to get a specific time output as 'human friendly'.

```shell
npm run start 10:55 # Five to eleven
```

## API

``` shell
http://[::1]:8080?numericTime=1:20
```

```json
{
    "result": "Twenty past one",
    "originalInput": "1:20",
    "sanitizedInput": "1:20"
}
```