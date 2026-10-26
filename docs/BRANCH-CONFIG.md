# Branch & Business Settings — One File to Edit

Edit ONLY `assets/js/config.js`. Every page reads branch name, city, address, phone, WhatsApp, business email, currency and form URLs from it — do not edit the same detail in multiple HTML files.

Fields: branchName, city, address, addressStatus, phoneDisplay, phoneLink, whatsappLink, businessEmail, currency, priceCheckedDate, priceSource, appsScriptUrl, orderFormUrl, careerFormUrl, mapsUrl.

To add another branch later: copy the config object into a `branches` array in config.js and add a branch selector to the Contact page — do not duplicate the whole site. Each new branch needs its own verified address and phone; never copy Bahawalpur details to another city.

Address rule: the `address` field currently says “to be confirmed”. Replace it only with an address the owner has verified in person or from an official HGW listing, and set addressStatus to "verified" with the source noted in README.md.
