# TALKING-CLOCK

The easiest way to get started is to:

See it in action here - https://tom-randell.github.io/talking-clock/

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://tomrandell-talkingclock-kxcfot22qfd.ws-eu61.gitpod.io/)

_:warning: Keep in mind that the time input when no arguments are present is relative to the machine being run - so running in GitPod may show a different timezone response for simply running npm run start_

You can also run the API by building and running the `Dockerfile` and then see the API section below.

## Github Action

I have now also setup a manual github action where you can test out the response (if you have access to the Actions section):

![image](https://user-images.githubusercontent.com/17002544/185634187-13a4a967-09aa-4d42-a81f-e99f1bb9e092.png)

![image](https://user-images.githubusercontent.com/17002544/185634034-fba6c74c-54f6-4759-bae8-aebae3c50ec0.png)


To get started clone the repo and run `npm install`.
you can run tests with `npm run test` or run the API with `npm run start:api`.

You can debug the CLI by selecting the 'Debug CLI' launch option in the RUN AND DEBUG section of VSCode.
You can debug the tests by selecting the 'Jest file' launch option in the RUN AND DEBUG section of VSCode.

## CLI

Running `npm run start` will run the CLI and output the current time in 'human friendly' format.
You can also pass in an argument to the CLI to get a specific time output as 'human friendly'.

```shell
npm run start 10:55 # Five to eleven
```

## API

```shell
http://0.0.0.0:8080?numericTime=1:20 # or simply http://0.0.0.0:8080
```

```json
{
  "result": "Twenty past one",
  "originalInput": "1:20",
  "sanitizedInput": "1:20"
}
```
