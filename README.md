# Branch Monster Factory

- #### dependencies 

    ```
    npm i -g grunt-cli bower yo generator-karma generator-angular
    ```

- #### code

    ```
    git clone git@github.com:BranchMetrics/Branch-Example-Deep-Linking-Branchster-Web.git
    cd Branch-Example-Deep-Linking-Branchster-Web
    npm run create
    ```

- #### develop

    ```
    npm run develop
    ```

- #### deploy

    ```
    npm run deploy
    aws s3 cp dist/ s3://branch-cdn/branchster-angular/ --recursive
    ```

  - merge code into `master`

- #### production

  - [http://cdn.branch.io/branchster-angular/](http://cdn.branch.io/branchster-angular/)
