# MovieRama 

React SPA with nodejs express project that allows posting and rating movies.

## Development

### Prerequisites
* npm (nodes js)
* docker


### Build & Run

From the root of the repo run 

```console
docker-compose -f ./deploy/docker-compose.yaml up --build
```

Optionally you may change ```DB_MOCK_DATA``` inside ```.env``` accordingly to have some initial data present. When ```DB_MOCK_DATA``` (default: ```true```) 12 movies will be present created by 4 users and some ratings. The creds for these mocked users are (```username```:```pass```):

- test1:test1
- test2:test2
- test3:test3
- test4:test4
