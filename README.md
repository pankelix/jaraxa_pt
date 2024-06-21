<p align="center">
  <img src="https://cdn-icons-png.flaticon.com/512/6295/6295417.png" width="100" />
</p>
<p align="center">
    <h1 align="center">JARAXA Technical Test</h1>
</p>
<p align="center">
    <em><code>► API from https://open.fda.gov/</code></em>
</p>
<p align="center">
	<img src="https://img.shields.io/github/last-commit/pankelix/jaraxa_pt?style=flat&logo=git&logoColor=white&color=0080ff" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/pankelix/jaraxa_pt?style=flat&color=0080ff" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/pankelix/jaraxa_pt?style=flat&color=0080ff" alt="repo-language-count">
<p>
<p align="center">
		<em>Developed with the software and tools below.</em>
</p>
<p align="center">
	<img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat&logo=JavaScript&logoColor=black" alt="JavaScript">
	<img src="https://img.shields.io/badge/HTML5-E34F26.svg?style=flat&logo=HTML5&logoColor=white" alt="HTML5">
	<img src="https://img.shields.io/badge/YAML-CB171E.svg?style=flat&logo=YAML&logoColor=white" alt="YAML">
	<img src="https://img.shields.io/badge/React-61DAFB.svg?style=flat&logo=React&logoColor=black" alt="React">
	<img src="https://img.shields.io/badge/JSON-000000.svg?style=flat&logo=JSON&logoColor=white" alt="JSON">
</p>
<hr>

##  Quick Links

> - [ Overview](#-overview)
> - [ Features](#-features)
> - [ Repository Structure](#-repository-structure)
> - [ Modules](#-modules)
> - [ Getting Started](#-getting-started)
>   - [ Installation](#-installation)
>   - [ Running jaraxa_pt](#-running-jaraxa_pt)
>   - [ Tests](#-tests)
> - [ Project Roadmap](#-project-roadmap)
> - [ Contributing](#-contributing)
> - [ License](#-license)
> - [ Acknowledgments](#-acknowledgments)

---

##  Overview

<code>► Jaraxa PT is a responsive web application designed to search for drug information using the OpenFDA API. The application provides an intuitive and user-friendly interface for users to search for drugs by brand name and view detailed information about each drug. The app is built using modern web development technologies including React, Tailwind CSS, and Material UI.</code>

---

##  Features

<code>► Search Functionality: Users can search for drugs by entering a brand name in the search bar. The app fetches data from the OpenFDA API and displays the results in a structured manner.
Infinite Scrolling: The app implements infinite scrolling to load more results as the user scrolls down the page.
Recently Searched Terms: The app keeps track of recently searched terms and displays them for quick access.
Responsive Design: The layout is responsive, ensuring a seamless experience across different devices and screen sizes.
Detailed Drug Information: Users can click on a drug from the search results to view detailed information, including usage instructions, warnings, and more.</code>

---

##  Repository Structure

```sh
└── jaraxa_pt/
    ├── README.md
    ├── package-lock.json
    ├── package.json
    ├── pnpm-lock.yaml
    ├── public
    │   ├── favicon.ico
    │   └── index.html
    ├── src
    │   ├── App.jsx
    │   ├── components
    │   │   ├── DrugList.jsx
    │   │   ├── DrugListItem.jsx
    │   │   ├── RecentlySearched.jsx
    │   │   └── SearchInput.jsx
    │   ├── index.css
    │   ├── index.js
    │   ├── logic
    │   │   ├── useDrugsSearch.js
    │   │   └── useDrugsSearchById.js
    │   └── views
    │       ├── DrugDetail.jsx
    │       └── SearchPage.jsx
    └── tailwind.config.js
```

---

##  Modules

<details closed><summary>.</summary>

| File                                                                                       | Summary                         |
| ---                                                                                        | ---                             |
| [package.json](https://github.com/pankelix/jaraxa_pt/blob/master/package.json)             |  |
| [tailwind.config.js](https://github.com/pankelix/jaraxa_pt/blob/master/tailwind.config.js) |  |
| [package-lock.json](https://github.com/pankelix/jaraxa_pt/blob/master/package-lock.json)   |  |
| [pnpm-lock.yaml](https://github.com/pankelix/jaraxa_pt/blob/master/pnpm-lock.yaml)         |  |

</details>

<details closed><summary>public</summary>

| File                                                                              | Summary                         |
| ---                                                                               | ---                             |
| [index.html](https://github.com/pankelix/jaraxa_pt/blob/master/public/index.html) |  |

</details>

<details closed><summary>src</summary>

| File                                                                         | Summary                         |
| ---                                                                          | ---                             |
| [App.jsx](https://github.com/pankelix/jaraxa_pt/blob/master/src/App.jsx)     |  |
| [index.js](https://github.com/pankelix/jaraxa_pt/blob/master/src/index.js)   |  |
| [index.css](https://github.com/pankelix/jaraxa_pt/blob/master/src/index.css) |  |

</details>

<details closed><summary>src.logic</summary>

| File                                                                                                       | Summary                         |
| ---                                                                                                        | ---                             |
| [useDrugsSearch.js](https://github.com/pankelix/jaraxa_pt/blob/master/src/logic/useDrugsSearch.js)         | <code>► API call logic</code> |
| [useDrugsSearchById.js](https://github.com/pankelix/jaraxa_pt/blob/master/src/logic/useDrugsSearchById.js) | <code>► API call by ID logic</code> |

</details>

<details closed><summary>src.components</summary>

| File                                                                                                          | Summary                         |
| ---                                                                                                           | ---                             |
| [SearchInput.jsx](https://github.com/pankelix/jaraxa_pt/blob/master/src/components/SearchInput.jsx)           | <code>► Component for text input</code> |
| [DrugList.jsx](https://github.com/pankelix/jaraxa_pt/blob/master/src/components/DrugList.jsx)                 | <code>► Component for list of results</code> |
| [RecentlySearched.jsx](https://github.com/pankelix/jaraxa_pt/blob/master/src/components/RecentlySearched.jsx) | <code>► Component for recently searched inputs</code> |
| [DrugListItem.jsx](https://github.com/pankelix/jaraxa_pt/blob/master/src/components/DrugListItem.jsx)         | <code>► Component for each drug in the list</code> |

</details>

<details closed><summary>src.views</summary>

| File                                                                                         | Summary                         |
| ---                                                                                          | ---                             |
| [DrugDetail.jsx](https://github.com/pankelix/jaraxa_pt/blob/master/src/views/DrugDetail.jsx) | <code>► All the details for every drug</code> |
| [SearchPage.jsx](https://github.com/pankelix/jaraxa_pt/blob/master/src/views/SearchPage.jsx) | <code>► Homepage</code> |

</details>

---

##  Getting Started

***Requirements***

Ensure you have the following dependencies installed on your system:

* **JavaScript**

###  Installation

1. Clone the jaraxa_pt repository:

```sh
git clone https://github.com/pankelix/jaraxa_pt
```

2. Change to the project directory:

```sh
cd jaraxa_pt
```

3. Install the dependencies:

```sh
npm install
```

###  Running jaraxa_pt

Use the following command to run jaraxa_pt:

```sh
npm start
```

---

##  License

This project is not protected under any License.

---

[**Return**](#-quick-links)

---
