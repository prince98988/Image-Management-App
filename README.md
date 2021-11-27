<h1>Image Management App</h1>
# an image management page using react, redux and styled-components, which displays image thumbnails using the Unsplash API.

1. All the screens should be as close to the design as possible. Please use accurate fonts
and spacing. The screens should render properly in the screen width range of 1024px to
1680px. The application must be made using the libraries - react, redux and
styled-components.
2. The Unsplash Public API will provide the image data. Please create a free developer
account on Unsplash to get an access token.
3. App should start with a default list of 20 images to be fetched from the List Photos
endpoint (which will be stored in redux store).
4. The images should be sortable(ascending) by Date(using field created_at), Title(using
first word in field description) and Size.
5. Images can be selected individually, or all images can be selected by clicking on the
Select All button. On selection, clicking the Delete button should remove them from the
list. The Delete button should only be enabled when 1 or more images are selected.
6. On typing in the search field, only the images with matching names should be visible.
7. On clicking the Add Image button, a Modal should appear with a search bar. Inside the
modal, on clicking Search, a list of images should be displayed using the Search Photos
endpoint. Once the image is selected a title should be provided (with default value as first
word in field description). The title length should be between 1 and 128 characters. On
clicking the Submit button, if the title is valid, the modal should close and the new image
should be added to the image list, after showing a success message.

Set-up:

1. Clone this repository

2. on cmd : 'npm install'   - to install all libraries

3. on cmd : 'npm start'  -to run this app 
