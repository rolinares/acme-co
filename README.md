# **Acme Co. Static Content CMS**

## 📌 **Overview**

This is a **full-stack Next.js application** that serves **static content pages** based on a Markdown file (`index.md`) found inside folders in the `content/` directory. The pages are rendered using a **Layuot.tsx** file, which receives a children with the Markdown content.

📢 **Key Features:**

- **Dynamic page generation** from Markdown files (`index.md`).
- **Folder-based URL routing** (e.g., `/about-page` → `content/about-page/index.md`).
- **Tailwind CSS** for styling.
- **Unit and integration tests** using **Jest** and **Testing Library**.
- **Fully configurable and deployable to Vercel**.

---

## 🚀 **Getting Started**

### **1️⃣ Prerequisites**

Before running the project, make sure you have the following installed:

- **Node.js** (>= 20.x recommended)
- **npm** (comes with Node.js) or **yarn**

### **2️⃣ Clone the Repository**

```sh
git clone https://github.com/rolinares/acme-co.git
cd acme-co
```

### **3️⃣ Install Dependencies**

Run the following command to install required dependencies:

```sh
npm install
# OR
yarn install
```

### **4️⃣ Start the Development Server**

```sh
npm run dev
# OR
yarn dev
```

Then, open http://localhost:3000 in your browser.

## ⚙️ **How It Works**

- Next.js uses `getStaticPaths` to generate routes dynamically from the folders in `content/`.

- `getStaticProps` loads the Markdown file (`index.md`) from each folder, converts it to HTML, and injects it into `Layout.tsx`.

- The pages are styled using `Tailwind CSS` and rendered dynamically.

## ✅ **Testing**

We use Jest and Testing Library to ensure the application works as expected.

### Run All Tests

```sh
npm test
# OR
yarn test
```

### What is Tested?

Page - getStaticProps

- ✔ Should render the page and return a 200 HTTP status for a valid URL
- ✔ Should return content if the file exist.
- ✔ Should return 404 if file doesn't exist.

HomePage - getStaticProps

- ✔ Should return an array with valid paths if there is index.md files.
- ✔ Should return an empty array if there is no index.md files.
- ✔ Should render the list of available pages.
- ✔ Should render the placeholder text.

## 🚀 **Deployment**

This app is optimized for **Vercel**, but can also be deployed on Netlify, AWS, or any static hosting service.

### Deployment on **Vercel**

You can try it on: https://acme-co-cms.vercel.app/

## 📝 **Future Improvements**

Some potential enhancements for the next version:

- 🧼 Apply some sanitize techniques to avoid dangerous injections via `.md` files
- 🌍 Multi-language support (i18n)
- 📝 Admin panel to edit Markdown content via UI

## 🛠 **Technologies Used**

- **Next.js** – Static site generation (SSG)

- **React** – Frontend framework

- **Tailwind CSS** – Styling

- **Jest & React Testing Library** – Testing

- **gray-matter** – Parses Markdown front matter

- **remark & remark-html** – Converts Markdown to HTML

- **Vercel** – Deployment

## 🌟 **Final Notes**

🚀 This project is a fully functional MVP for Acme Co’s CMS.

💡 It can be easily extended with new features in the future.
