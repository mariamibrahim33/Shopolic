# 🚀 Deploying Shopolic (live URL)

This deploys Shopolic as **one Render web service** that serves both the Angular
site and the API, using **MongoDB Atlas** for the database. Everything below uses
free tiers.

You'll do three things: (1) create a cloud database, (2) seed it, (3) deploy on Render.

---

## 1. Create the database (MongoDB Atlas)

1. Go to <https://www.mongodb.com/cloud/atlas/register> and sign up (free).
2. Create a **free M0 cluster** (any provider/region near you).
3. **Database Access** → *Add New Database User* → create a username & password
   (save them — you'll need them). Give it "Read and write to any database".
4. **Network Access** → *Add IP Address* → **Allow Access from Anywhere**
   (`0.0.0.0/0`). This lets Render connect.
5. **Clusters** → *Connect* → *Drivers* → copy the connection string. It looks like:
   ```
   mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. Edit it: replace `<user>` and `<password>`, and add the database name
   `shopolic` right before the `?`:
   ```
   mongodb+srv://myuser:mypass@cluster0.xxxxx.mongodb.net/shopolic?retryWrites=true&w=majority
   ```
   Keep this final string handy — call it **MONGO_URI**.

---

## 2. Seed the cloud database (once, from your machine)

The images themselves ship with the app, but the product records live in the
database, so seed Atlas once:

```bash
cd server
# temporarily point the app at Atlas:
#   open server/.env and set  MONGO_URI=<your Atlas string from step 1>
npm run seed        # inserts products + demo admin into Atlas
npm run images      # links your uploaded photos (from product-photos/)
```

You should see `✓ Inserted … products` and `✓ Imported … photo(s)`.
When done, you can set `server/.env` back to the local URI for local development.

---

## 3. Deploy on Render

1. Make sure your latest code is pushed to GitHub (this repo).
2. Go to <https://render.com> and sign up (you can log in with GitHub).
3. **New +** → **Blueprint** → select this repository.
   Render reads `render.yaml` and configures the service automatically.
   *(If you prefer, use **New + → Web Service** instead and set:*
   *Build Command `npm run render-build`, Start Command `npm run render-start`.)*
4. When prompted, add the two environment variables:
   | Key | Value |
   |-----|-------|
   | `MONGO_URI` | your Atlas connection string from step 1 |
   | `JWT_SECRET` | any long random string (e.g. mash the keyboard) |
5. Click **Apply / Create**. The first build takes a few minutes.
6. When it's done, Render gives you a URL like **`https://shopolic.onrender.com`** —
   that's your live site! 🎉

---

## 4. Add it to your portfolio

Use the Render URL as the "Live Demo" link. Alongside it, mention:

- **Try the admin dashboard:** log in with `admin@shopolic.com` / `admin123`
- Or register a new account to shop as a customer.

---

## Notes

- **Free tier sleeps:** after ~15 min idle, Render spins the service down. The next
  visit takes ~50 seconds to wake up, then it's fast. (Upgrading removes this.)
- **Updating the site:** just `git push` — Render redeploys automatically.
- **Security:** never commit your real `MONGO_URI`/`JWT_SECRET`. They live only in
  Render's environment settings and your local `.env` (which is git-ignored).
