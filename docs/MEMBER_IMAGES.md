# Member Image Management Guide / راهنمای مدیریت تصاویر اعضا

## 1. Where images live / محل ذخیره تصاویر

Static member portraits are stored in `public/images/` and served at `/images/<file>`.

تصاویر پرتره اعضا در پوشه `public/images/` ذخیره می‌شوند و از مسیر `/images/<file>` در دسترس هستند.

| File / نام فایل | Member / عضو |
|---|---|
| `gino-ayyoubian.jpg` | Gino Ayyoubian / ژینو ایوبیان |
| `reza-baghdadchi.jpg` | Reza Baghdadchi / رضا بغدادچی |
| `ashkan-tofangchiha.jpg` | Ashkan Tofangchiha / اشکان تفنگچی‌ها |
| `reza-asakereh.jpg` | Reza Asakereh / رضا عساکره |
| `khosro-jarrahian.jpg` | Khosro Jarrahian / خسرو جراحیان |
| `pedram-abdarzadeh.jpg` | Pedram Abdarzadeh / پدرام آبدارزاده |
| `hamed-zatajam.jpg` | Hamed Zatajam / حامد ذات‌عجم |
| `sina-ayyoubian.jpg` | Sina Ayyoubian / سینا ایوبیان |
| `farid-imani.jpeg` / `farid-imani.jpg` | Farid Imani / فرید ایمانی |
| `mostafa-sharifi.jpg` | Mostafa Sharifi / مصطفی شریفی |

Other images may also be present in this folder. Recommended portrait format: JPG or WebP, square or 4:5, at least 400×400 px, under 300 KB, and a lowercase kebab-case filename such as `first-last.jpg`.

ممکن است تصاویر دیگری نیز در این پوشه وجود داشته باشند. قالب پیشنهادی پرتره: JPG یا WebP، مربعی یا با نسبت ۴:۵، حداقل ۴۰۰×۴۰۰ پیکسل و کمتر از ۳۰۰ کیلوبایت. نام فایل را با حروف کوچک و خط تیره، مانند `first-last.jpg`، انتخاب کنید.

## 2. Where images are referenced / محل ارجاع تصاویر

These are the member-photo references to check before renaming a portrait:

پیش از تغییر نام یک پرتره، ارجاع‌های زیر به تصاویر اعضا را بررسی کنید:

- `pages/CorporateInfoPage.tsx` – leadership cards use `image: '/images/...'`.
- `pages/TeamPage.tsx` – team entries use `imageUrl: "/images/..."`.
- `pages/AboutUsPage.tsx` – the CEO portrait uses `/images/gino-ayyoubian.jpg`; its image-error fallback is `/gino-ayyoubian.jpg`.
- `components/CEOSignatureBanner.tsx` – the CEO portrait uses `/images/gino-ayyoubian.jpg`.
- `components/common/ExecutiveMemberIdentity.tsx` – fallback mappings point to all eight portrait files listed above.
- `data/orgMembers.ts` – each `OrgMemberProfile` can set an `avatarUrl`; the field is defined in `types.ts`.
- `components/LeadershipTeam.tsx` does not define image paths directly. Its cards render `INITIAL_ORG_MEMBERS` through `TeamCard` and `ExecutiveMemberIdentity`, so check the data entries and fallback mappings above.

- `pages/CorporateInfoPage.tsx` – کارت‌های مدیران از `image: '/images/...'` استفاده می‌کنند.
- `pages/TeamPage.tsx` – تصویر اعضای تیم در فیلد `imageUrl: "/images/..."` ثبت می‌شود.
- `pages/AboutUsPage.tsx` – تصویر مدیرعامل از `/images/gino-ayyoubian.jpg` استفاده می‌کند؛ مسیر جایگزین هنگام خطای بارگذاری `/gino-ayyoubian.jpg` است.
- `components/CEOSignatureBanner.tsx` – تصویر مدیرعامل از `/images/gino-ayyoubian.jpg` استفاده می‌کند.
- `components/common/ExecutiveMemberIdentity.tsx` – نگاشت‌های جایگزین به هر هشت فایل پرتره فهرست‌شده در بالا اشاره می‌کنند.
- `data/orgMembers.ts` – برای هر `OrgMemberProfile` می‌توان `avatarUrl` تعیین کرد؛ این فیلد در `types.ts` تعریف شده است.
- `components/LeadershipTeam.tsx` مسیر تصویر را مستقیماً تعریف نمی‌کند. کارت‌ها، `INITIAL_ORG_MEMBERS` را از طریق `TeamCard` و `ExecutiveMemberIdentity` نمایش می‌دهند؛ بنابراین ورودی‌های داده و نگاشت‌های جایگزین بالا را بررسی کنید.

When renaming a file, search the repository for its old filename and update every matching reference, including fallback paths. For example: `grep -rn "old-name.jpg" pages components data`.

هنگام تغییر نام فایل، نام قبلی را در کل مخزن جست‌وجو کنید و همه ارجاع‌های منطبق، از جمله مسیرهای جایگزین، را به‌روزرسانی کنید. برای نمونه: `grep -rn "old-name.jpg" pages components data`.

## 3. Replacing an existing photo / جایگزینی تصویر موجود

Upload the replacement to `public/images/` using the exact same filename. This preserves existing references and normally requires no code changes. Hard-refresh the browser (Ctrl+Shift+R) to check whether a cached copy is still displayed.

تصویر جدید را با همان نام دقیق در `public/images/` بارگذاری کنید. به این ترتیب ارجاع‌های موجود حفظ می‌شوند و معمولاً نیازی به تغییر کد نیست. برای بررسی نسخه ذخیره‌شده در حافظه نهان مرورگر، صفحه را با Ctrl+Shift+R بازخوانی کنید.

## 4. Using `avatarUrl` / استفاده از `avatarUrl`

In application data, `OrgMemberProfile.avatarUrl` can contain a local path such as `/images/jane-doe.jpg` or an external image URL. When the value is empty, recognized leaders still receive their portrait through the hard-coded mappings in `ExecutiveMemberIdentity`; other members without a photo display the corporate monogram.

در داده‌های برنامه، فیلد `OrgMemberProfile.avatarUrl` می‌تواند مسیر محلی مانند `/images/jane-doe.jpg` یا نشانی اینترنتی یک تصویر خارجی باشد. اگر این فیلد خالی باشد، پرتره مدیران شناخته‌شده از نگاشت‌های ثابت در `ExecutiveMemberIdentity` نمایش داده می‌شود؛ برای سایر اعضای فاقد تصویر، نشان نوشتاری سازمان نمایش داده خواهد شد.

```ts
{
  uid: 'kkm-user-010',
  displayName: 'Jane Doe',
  avatarUrl: '/images/jane-doe.jpg',               // local file in public/images/
  // avatarUrl: 'https://example.com/jane-doe.jpg' // or an external URL
}
```

## 5. Adding a new member with a photo / افزودن عضو جدید همراه با تصویر

1. Add the image at `public/images/first-last.jpg`.
2. Choose one of these ways to set the photo:
   - **Portal UI:** Internal Portal → Add User (or Edit User) → *Photo URL*. This field is a URL input and requires an absolute URL. For an image in this site's `public/images/`, enter its full deployed address, for example `https://<deployed-domain>/images/first-last.jpg`—not `/images/first-last.jpg`.
   - **Code:** add an entry to `INITIAL_ORG_MEMBERS` in `data/orgMembers.ts` with `avatarUrl: '/images/first-last.jpg'`.
3. To show the member on public team pages, also add an entry in `pages/TeamPage.tsx` (`imageUrl`) and/or `pages/CorporateInfoPage.tsx` (`image`).

۱. تصویر را در مسیر `public/images/first-last.jpg` اضافه کنید.
۲. برای ثبت تصویر یکی از روش‌های زیر را انتخاب کنید:
   - **رابط کاربری پرتال:** Internal Portal → Add User (یا Edit User) → فیلد *Photo URL*. این فیلد از نوع نشانی اینترنتی است و نشانی کامل می‌خواهد. برای تصویری در پوشه `public/images/` همین سایت، نشانی کامل پس از استقرار را وارد کنید؛ برای نمونه `https://<deployed-domain>/images/first-last.jpg`، نه `/images/first-last.jpg`.
   - **کد:** ورودی عضو را به `INITIAL_ORG_MEMBERS` در `data/orgMembers.ts` اضافه کنید و `avatarUrl: '/images/first-last.jpg'` را قرار دهید.
۳. برای نمایش عضو در صفحات عمومی تیم، ورودی او را در `pages/TeamPage.tsx` (فیلد `imageUrl`) و/یا `pages/CorporateInfoPage.tsx` (فیلد `image`) نیز اضافه کنید.

## 6. Uploading through GitHub / بارگذاری از طریق GitHub

1. Open the repository and go to `public/images/`.
2. Select **Add file → Upload files** and choose the image. Use the same filename to replace an existing image.
3. Choose **Create a new branch and start a pull request**, then commit the change.
4. After the pull request is merged and deployed, the image is served at `/images/<file>`.

۱. مخزن را باز کنید و به پوشه `public/images/` بروید.
۲. **Add file → Upload files** را انتخاب و تصویر را بارگذاری کنید. برای جایگزینی تصویر موجود، همان نام فایل را به کار ببرید.
۳. گزینه **Create a new branch and start a pull request** را انتخاب کنید و سپس تغییر را ثبت کنید.
۴. پس از ادغام درخواست ادغام و استقرار، تصویر از مسیر `/images/<file>` ارائه می‌شود.

Command-line alternative:

روش جایگزین با خط فرمان:

```bash
cp ~/new.jpg public/images/gino-ayyoubian.jpg
git add public/images && git commit -m "Update member photo" && git push
```

## 7. Troubleshooting / عیب‌یابی

- **Broken image:** check filename capitalization and spelling, confirm the file is under `public/images/`, and verify the reference path.
- **Old photo still appears:** hard-refresh or clear the browser and PWA/service-worker cache.
- **Portal rejects the photo address:** use a complete deployed URL such as `https://<deployed-domain>/images/first-last.jpg`; a root-relative path is accepted in code but not by the portal's URL field.
- **Privacy and rights:** do not commit private or unlicensed photos; obtain the member's consent.

- **تصویر خراب است:** بزرگی و کوچکی حروف و املای نام فایل را بررسی کنید، مطمئن شوید فایل در `public/images/` قرار دارد و مسیر ارجاع درست است.
- **تصویر قبلی همچنان نمایش داده می‌شود:** صفحه را با بارگذاری مجدد کامل باز کنید یا حافظه نهان مرورگر و PWA/سرویس‌ورکر را پاک کنید.
- **پرتال نشانی تصویر را نمی‌پذیرد:** نشانی کامل و مستقرشده‌ای مانند `https://<deployed-domain>/images/first-last.jpg` وارد کنید؛ مسیر نسبی از ریشه در کد قابل استفاده است، اما فیلد نشانی اینترنتی پرتال آن را نمی‌پذیرد.
- **حریم خصوصی و حقوق استفاده:** تصاویر خصوصی یا فاقد مجوز را ثبت نکنید و پیش از انتشار رضایت عضو را بگیرید.
