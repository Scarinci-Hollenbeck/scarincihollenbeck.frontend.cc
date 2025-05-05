# Scarincihollenbeck.com - Frontend

This repository contains the code base for the frontend of scarincihollenbeck.com. The code base is made up of two applications. The client application contains all code that makes up front end of scarincihollenbeck.com and the second application is a utility application that generates new sitemaps based on the latest content published to the site.

### [Live Site](https://scarincihollenbeck.com/)

## Build status

![Lint passing](https://camo.githubusercontent.com/df0f65b2d0e7a0448dd50abbc3b4364dc971533f/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f776f726b666c6f772f7374617475732f70726574746965722f70726574746965722f4c696e743f6c6162656c3d4c696e74267374796c653d666c61742d737175617265)
![Coverage](https://camo.githubusercontent.com/facfcb6afd684d2c9701c7d6add65f391fdf86fc/68747470733a2f2f696d672e736869656c64732e696f2f636f6465636f762f632f6769746875622f6477796c2f686170692d617574682d6a7774322e7376673f6d61784167653d32353932303030)
![Speed blazing](https://camo.githubusercontent.com/c0d653f4e211ffff68800215f80fb458e25ae6f0/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f73706565642d626c617a696e672532302546302539462539342541352d627269676874677265656e2e7376673f7374796c653d666c61742d737175617265)

## Code style

![Code Style Airbnb](https://camo.githubusercontent.com/1c5c800fbdabc79cfaca8c90dd47022a5b5c7486/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f636f64652532307374796c652d616972626e622d627269676874677265656e2e7376673f7374796c653d666c61742d737175617265)

## Tech used

**Client Application built with**

- [Apollo GraphQL](https://www.apollographql.com/)
- [Algolia](https://www.algolia.com/)
- [Animate.css](https://animate.style/)
- [Bootstrap 4](https://getbootstrap.com/docs/4.0/getting-started/introduction/)
- [GraphQL](https://graphql.org/)
- [KwesForms](https://kwesforms.com/)
- [Next](https://nextjs.org/)
- [MySQL](https://www.mysql.com/)
- [React Bootstrap](https://react-bootstrap.github.io/)
- [React Cookie-Consent](https://github.com/Mastermindzh/react-cookie-consent#readme)
- [RSS Parser](https://github.com/rbren/rss-parser#readme)
- [Styled Components](https://styled-components.com/)

## Install

```
git clone https://github.com/s1100h/scarincihollenbeck.cc.git
```

**Client Application**

```
cd scarincihollenbeck.frontend.cc
yarn install
```

## Development

Before you can run the client application in development you first need to download and configure the [scarincihollenbeck.com backend services](https://github.com/s1100h/admin.scarincihollenbeck.cc/tree/main). You can find the directions on how to set up that in that repositories README.

After your finish setting up the backend, you can now run the command `yarn dev`. This will lauch the local version of the site into the browser on port `7700`.

## Production

To create a production copy of the client application run `yarn build`. Then to launch the production server locally run `yarn start`. This will launch the production verion of the site into the browser running on port `7300`.

### Deployment

To deploy changes to the live domain [scarincihollenbeck.com](https://scarinciholleneck.com) commit your changes to the `client-prod` branch. To send changes to the live preview domain [https://scarincihollenbeck-cc-git-production.s1100h.vercel.app/](https://scarincihollenbeck-cc-git-production.s1100h.vercel.app/) commit your changes to `production` branch.

Update jwt token for GraphQl protection every 1 year. Use this query for update in graphQL WP composer, change pass and login.
Link on plugin - https://github.com/wp-graphql/wp-graphql-jwt-authentication?tab=readme-ov-file

mutation LoginUser {
login(
input: {clientMutationId: "uniqueId", username: "admin", password: "adminpass"}
) {
refreshToken
}
}

Last update - 24.04.2025.
