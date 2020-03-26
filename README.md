# Temporary fork

This is a temporary fork of the [@reach/tabs package from Reach UI](https://github.com/reach/reach-ui/blob/master/packages/tabs/) so we can use [this PR](https://github.com/reach/reach-ui/pull/486) internally before it's merged.

It's not a "real" GitHub fork because the Reach UI project is a monorepo, and you can't currently target a GitHub repo subdirectory in package.json (see [this yarn issue](https://github.com/yarnpkg/yarn/issues/4725) or [this npm issue](https://github.com/npm/npm/issues/2974)). So instead, we created this fork manually with these steps:

- In a local reach-ui clone, with [this PR's](https://github.com/reach/reach-ui/pull/486) branch checked out:

    ```sh
    yarn clean
    yarn install
    yarn build
    ```

- `mkdir ../reach-tabs`
- `cp .gitignore ../reach-tabs/`
- `cd ../reach-tabs`
- `git init`, commit, and push to a new GitHub repo

The files in `dist/` are included intentionally, because we'll be using this package directly from GitHub rather than publishing it to a package registry.

# @reach/tabs

[![Stable release](https://img.shields.io/npm/v/@reach/tabs.svg)](https://npm.im/@reach/tabs) ![MIT license](https://badgen.now.sh/badge/license/MIT)

[Docs](https://reacttraining.com/reach-ui/tabs) | [Source](https://github.com/reach/reach-ui/tree/master/packages/tabs) | [WAI-ARIA](https://www.w3.org/TR/wai-aria-practices-1.2/#tabpanel)

An accessible tabs component.

The `Tab` and `TabPanel` elements are associated by their order in the tree. None of the components are empty wrappers, each is associated with a real DOM element in the document, giving you maximum control over styling and composition.

You can render any other elements you want inside of `Tabs`, but `TabList` should only render `Tab` elements, and `TabPanels` should only render `TabPanel` elements.

```jsx
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@reach/tabs";
import "@reach/tabs/styles.css";

function Example() {
  return (
    <Tabs>
      <TabList>
        <Tab>One</Tab>
        <Tab>Two</Tab>
        <Tab>Three</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <p>one!</p>
        </TabPanel>
        <TabPanel>
          <p>two!</p>
        </TabPanel>
        <TabPanel>
          <p>three!</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
```
