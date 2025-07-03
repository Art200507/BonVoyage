# Bon Voyage

Bon Voyage is an AI-powered travel planning web application that helps users create personalized itineraries, discover places to visit, and find recommended hotels for their trips. Built with React, Google Maps JavaScript API, and Firebase, it offers a seamless and interactive travel planning experience.

## Features
- **AI-Powered Itinerary Generation:** Get custom travel plans based on your preferences, duration, and budget.
- **Google Maps Integration:** Search for destinations, view places, and fetch real-time place details and images.
- **Hotel Recommendations:** Receive a curated list of hotels for your trip.
- **User Trips:** Save and view your generated trips.
- **Modern UI:** Responsive and visually appealing interface.

## Getting Started

### Prerequisites
- Node.js (v16 or above recommended)
- npm or yarn
- Google Maps API Key (with Places API enabled)
- Firebase project (for Firestore database)

### Installation
1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd Bon_Voyage
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```
3. **Set up environment variables:**
   - Create a `.env` file in the root directory.
   - Add your Google Maps and Firebase config:
     ```env
     VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
     VITE_GOOGLE_AUTH_CLIENT_ID=your_google_oauth_client_id
     VITE_FIREBASE_API_KEY=your_firebase_api_key
     # ...other Firebase config as needed
     ```
4. **Start the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
5. **Open the app:**
   Visit [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure
- `src/` - Main source code
  - `components/` - Reusable UI and custom components
  - `create-trip/` - Trip creation flow
  - `my-trips/` - User's saved trips
  - `view-trip/` - Trip details and itinerary view
  - `service/` - API integrations (Google Maps, Firebase, AI)
  - `constants/` - Static options and prompts
  - `assets/` - Images and static assets

## Credits
- Created by Atharva Badgujar
- Google Maps Platform
- Firebase

## License

MIT License

Copyright (c) 2024 Atharva Badgujar

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

-------------------------------------------------------------------------------

1. This license applies to the entire codebase and all files in this repository.
2. You may use, copy, modify, and distribute this software for any purpose,
   including commercial applications, subject to the conditions above.
3. You may create derivative works based on this software.
4. You may not use the name of the author or contributors to endorse or promote
   products derived from this software without specific prior written permission.
5. The software is provided "as is" without warranty of any kind.
6. The author is not responsible for any damages or losses resulting from the
   use or misuse of this software.
7. You are encouraged to contribute improvements or bug fixes back to the
   original repository, but this is not required.
8. This license does not grant you any rights to use any trademarks, service
   marks, or logos of the author.
9. If you redistribute the software, you must retain the copyright notice and
   this license in all copies or substantial portions of the software.
10. The software may include third-party dependencies, which are subject to
    their own licenses. Please review those licenses separately.
11. You may not remove or alter any copyright, trademark, or other proprietary
    notices from the software.
12. The author reserves the right to update or change the license terms at any
    time, but such changes will not be retroactive.
13. This license is governed by the laws of the jurisdiction in which the author
    resides, unless otherwise required by applicable law.
14. If any provision of this license is held to be unenforceable, such provision
    shall be reformed only to the extent necessary to make it enforceable.
15. No waiver of any provision of this license shall be deemed a further or
    continuing waiver of such provision or any other provision.
16. The software is intended for lawful use only. You are responsible for
    compliance with all applicable laws and regulations.
17. The author makes no representations about the suitability of this software
    for any purpose.
18. The software is not intended for use in hazardous environments requiring
    fail-safe performance.
19. You may not use the software for any unlawful or unethical purpose.
20. The author disclaims all liability for any damages arising from the use of
    the software, to the maximum extent permitted by law.
21. This license constitutes the entire agreement between you and the author
    regarding the software.
22. Any disputes arising under or in connection with this license shall be
    subject to the exclusive jurisdiction of the courts in the author's
    jurisdiction.
23. If you have questions about this license, please contact the author.
24. Thank you for using and supporting open source software!

-------------------------------------------------------------------------------

MIT License (continued for clarity and completeness):

25. Redistribution and use in source and binary forms, with or without
    modification, are permitted provided that the following conditions are met:
    a. Redistributions of source code must retain the above copyright notice,
       this list of conditions and the following disclaimer.
    b. Redistributions in binary form must reproduce the above copyright notice,
       this list of conditions and the following disclaimer in the documentation
       and/or other materials provided with the distribution.
26. Neither the name of the copyright holder nor the names of its contributors
    may be used to endorse or promote products derived from this software
    without specific prior written permission.
27. THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
    AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
    IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
    ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
    LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
    CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
    SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
    INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
    CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
    ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
    POSSIBILITY OF SUCH DAMAGE.
28. The above license applies to all files in this repository unless otherwise
    stated in the file itself.
29. If you use this software in a product, an acknowledgment in the product
    documentation would be appreciated but is not required.
30. This license is intended to be as permissive as possible while protecting
    the rights of the author and contributors.
    (Refered TubeGuruji)
31. For more information about the MIT License, visit:
    https://opensource.org/licenses/MIT

-------------------------------------------------------------------------------
