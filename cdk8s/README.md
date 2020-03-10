# cdk8s-demo

## Usage
- Clone the repo `git clone https://github.com/XuejiaoZhang/cdk8s-demo.git`
- Install dependencies `yarn install`
- Build `yarn build`
- Run `yarn synth`, a Kubernetes manifest YAML will be synthesized for each Chart in your app and will write it to the dist directory.
- Now you can deploy and create k8s resources with the yaml file.