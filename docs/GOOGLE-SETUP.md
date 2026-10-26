# Google Forms, Sheets & Apps Script — Owner Setup (do this in ahadworksspace@gmail.com)

This project cannot access or configure that Google account automatically. Follow these steps while signed in as the owner.

## 1. Create the two Forms and Sheets
1. Go to Google Forms → Blank form → title **HGW Product Orders and Inquiries**. Add fields: Full name*, Phone/WhatsApp*, Email (optional), Product name*, Quantity*, Delivery city, Delivery address, Order/inquiry message, Consent*.
2. Responses tab → Link to Sheets → Create a new spreadsheet → rename it **HGW Orders**.
3. Repeat for **HGW Careers and Job Applications** with fields: Full name*, Phone*, Email*, Position/department*, Education*, Experience, Skills, City*, Message, Consent*. Enable file upload for CV if you want CVs — uploads go to a Drive folder owned by the form owner; keep that folder private and never share it publicly.
4. In each Form: Settings → Responses → Collect email addresses only if you want it (the form fields already ask for email). Turn OFF “Allow response editing” unless you need it.

## 2. Email notifications from Forms
In each Form → Responses → ⋮ → Get email notifications for new responses. This is separate from Apps Script mail and is the most reliable notification route. Confirm the notification address is ahadworksspace@gmail.com.

## 3. Apps Script (website backend)
1. Open script.google.com → New project → paste `backend/Code.gs`.
2. Project Settings → Script Properties, add: ORDERS_SHEET_NAME=HGW Orders, CAREERS_SHEET_NAME=HGW Careers, NOTIFY_EMAIL=ahadworksspace@gmail.com.
3. The script must be bound to, or open, the spreadsheet that contains both sheets — easiest: in the HGW Orders spreadsheet, Extensions → Apps Script, paste the code there, so getActiveSpreadsheet() finds both sheets (create the Careers sheet in the same workbook, or keep two workbooks and adjust the code to open by name only if you are comfortable editing it).
4. Deploy → New deployment → Web app → Execute as: Me → Who has access: Anyone → Deploy. Authorize with the owner account and allow the Gmail/Sheets scopes it requests. Copy the `/exec` URL.
5. Paste that URL into `assets/js/config.js` as appsScriptUrl, and also paste the two Form URLs as orderFormUrl / careerFormUrl.
6. Test: submit a test order and a test career application from the live site. Check both Sheets for a timestamped row and check ahadworksspace@gmail.com for the notification. Delete test rows after.

## 4. Protect the Sheets
Share each Sheet only with staff who need it (Viewer/Editor as appropriate, never “Anyone with the link” for submissions). Do not put Sheet links, IDs or the Apps Script URL's internal details in public pages other than the /exec endpoint the form needs. Never publish applicant CVs or personal data.

## 5. Export to Excel (.xlsx)
In Google Sheets: File → Download → Microsoft Excel (.xlsx). Do this per sheet (HGW Orders, HGW Careers). For a recurring export, use File → Download each time, or set up a Drive backup manually — do not automate exports to a public folder.

## Troubleshooting
- “Direct submission is not configured” = appsScriptUrl is empty in config.js.
- 403 / authorization errors = redeploy the Web App as a new version after any code change, and re-authorize.
- No email = check Form notifications (step 2) and Apps Script Executions log; Gmail quotas apply.
