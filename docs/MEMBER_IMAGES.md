# Member Image Management Guide / راهنمای مدیریت تصاویر اعضا

## 1. Where images live / محل ذخیره تصاویر

Static member portraits are stored in `public/images/` and served at `/images/<file>`.

| File | Person |
|---|---|
| `gino-ayyoubian.jpg` | CEO |
| `reza-baghdadchi.jpg` | Vice Chairman |
| `ashkan-tofangchiha.jpg` | Board Member |
| `khosro-jarrahian.jpg` | Director of Sustainability |

Other portraits (e.g. `hamed-zatajam.jpg`, `pedram-abdarzadeh.jpg`) live in the same folder.

Recommendations: JPG/WebP, square or 4:5 portrait, at least 400×400 px, under 300 KB, lowercase kebab-case names (`first-last.jpg`).

## 2. Where images are referenced / مکان‌های استفاده

- `pages/CorporateInfoPage.tsx` – `image: '/images/...'`
- `pages/TeamPage.tsx` – `imageUrl: "/images/..."`
- `components/CEOSignatureBanner.tsx` – `src="/images/gino-ayyoubian.jpg"`
- `components/LeadershipTeam.tsx` – leadership cards
- `data/orgMembers.ts` – `avatarUrl` of each `OrgMemberProfile` (field defined in `types.ts`)

## 3. Replacing an existing photo / جایگزینی تصویر

Upload the new file **with the exact same file name** into `public/images/` (overwrite). No code changes are needed. Browsers may cache the old one; hard-refresh (Ctrl+Shift+R) to verify.

If the file name or extension changes, update every reference listed in section 2 (`grep -rn "old-name.jpg" pages components data`).

## 4. Using `avatarUrl` / استفاده از فیلد avatarUrl

`avatarUrl?: string` on `OrgMemberProfile` accepts either a local path or an external HTTPS URL. If empty, a corporate monogram is shown.

```ts
{
  uid: 'kkm-user-010',
  displayName: 'Jane Doe',
  avatarUrl: '/images/jane-doe.jpg',               // local file in public/images/
  // avatarUrl: 'https://example.com/jane-doe.jpg' // or an external URL
}
```

## 5. Adding a new member with a photo / افزودن عضو جدید

1. Add `public/images/first-last.jpg`.
2. Either:
   - **Portal UI:** Internal Portal → Add User → fill the *Photo URL* field with `/images/first-last.jpg`. (Edit User has the same field.)
   - **Code:** add an entry to `INITIAL_ORG_MEMBERS` in `data/orgMembers.ts` with `avatarUrl: '/images/first-last.jpg'`.
3. For public team pages, also add an entry in `pages/TeamPage.tsx` (`imageUrl`) and/or `pages/CorporateInfoPage.tsx` (`image`).

## 6. Uploading through GitHub / آپلود از طریق GitHub

1. Open the repository → `public/images/`.
2. **Add file → Upload files**, drag the image (same name to replace).
3. Choose "Create a new branch and start a pull request", then commit.
4. Merge the PR; the deployment publishes the image at `/images/<file>`.

Command line alternative:

```bash
cp ~/new.jpg public/images/gino-ayyoubian.jpg
git add public/images && git commit -m "Update member photo" && git push
```

## 7. Troubleshooting / عیب‌یابی

- Broken image: check the name is case-sensitive identical and the path starts with `/images/`.
- Old photo shown: clear browser/service-worker cache (PWA) or hard-refresh.
- Do not commit private or unlicensed photos; obtain the member's consent.
