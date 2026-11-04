- [ ] Confirm desired MongoDB behavior when Atlas is unreachable (crash vs continue with limited features).
- [ ] Edit server/index.js to make MongoDB connection non-fatal (do not crash) OR add clear instructions for MongoDB IP whitelist.
- [ ] Re-run `npm run dev` and verify server stays up.
- [ ] If admin seeding depends on DB, ensure endpoints handle missing DB gracefully.

