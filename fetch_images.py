import urllib3
import requests
import shutil

urls = """
https://pablo-farias.imgix.net/Pablo_Farias-3.jpg?w=1200
https://pablo-farias.imgix.net/Pablo_Farias-41.jpg?w=1200
https://pablo-farias.imgix.net/Pablo_Farias-46.jpg?w=1200
https://pablo-farias.imgix.net/Pablo_Farias-62.jpg?w=1200
https://pablo-farias.imgix.net/MG_Farias-33.jpg?w=1200
https://pablo-farias.imgix.net/Farias_vi_05-2020_13.jpg?w=1200
https://pablo-farias.imgix.net/Pablo_Farias-62.jpg?w=1200
https://pablo-farias.imgix.net/02_vi_2018.jpg?w=1200
https://pablo-farias.imgix.net/03_vi_2018.jpg?w=1200
https://pablo-farias.imgix.net/Farias_vi_05-2020_12.jpg?w=1200
https://pablo-farias.imgix.net/Pablo_Farias-62.jpg?w=1200
https://pablo-farias.imgix.net/IMG_0226.JPG?w=1200
https://pablo-farias.imgix.net/MG_Farias-33.jpg?w=1200
https://pablo-farias.imgix.net/Pablo_Farias-3.jpg?w=1200
https://pablo-farias.imgix.net/03_ce.jpg?w=1200
https://pablo-farias.imgix.net/Pablo_Farias-94.jpg?w=1200
https://pablo-farias.imgix.net/Pablo_Farias-62.jpg?w=1200
https://pablo-farias.imgix.net/Pablo_Farias-46.jpg?w=1200
https://pablo-farias.imgix.net/Pablo_Farias-41.jpg?w=1200
https://pablo-farias.imgix.net/Pablo_Farias-82.jpg?w=1200
"""

for i, url in enumerate(urls.strip().split('\n')):
  image_url = url
  filename = 'img' + str(i) + '.jpg'

  # Open the url image, set stream to True, this will return the stream content.
  r = requests.get(image_url, stream = True)

  # Check if the image was retrieved successfully
  if r.status_code == 200:
    # Set decode_content value to True, otherwise the downloaded image file's size will be zero.
    r.raw.decode_content = True
    
    # Open a local file with wb ( write binary ) permission.
    with open(filename,'wb') as f:
        shutil.copyfileobj(r.raw, f)
        
    print('Image sucessfully Downloaded: ',filename)
  else:
    print('Image Couldn\'t be retreived')
