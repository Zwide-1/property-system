#from supabase import create_client
#import os

#supabase = create_client(
#    os.getenv("SUPABASE_URL"),
#    os.getenv("SUPABASE_KEY")
#)

#def upload_image(file, filename):
#    path = f"stands/{filename}"

#    supabase.storage.from_("stands-images").upload(
#        path,
#        file.read(),
#        {"content-type": file.content_type}
#    )

#    return supabase.storage.from_("stands-images").get_public_url(path)