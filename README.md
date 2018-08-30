## Introduction

A serverless example on how to manage a s3 bucket.

When a file is loaded into the bucket it will send an email

It needs  the credentials set up.



To get it to work correctly I needed to add the following to the yml file

  profile: serverless-admin

### Useful commands

```
sls config credentials --provider aws --key ???  --secret ?? --profile serverless-admin

sls deploy -s dev

sls logs -f <function name> -s dev -t
```


