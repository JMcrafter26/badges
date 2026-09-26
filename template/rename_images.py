import os

# get path of the current script
script_dir = os.path.dirname(os.path.abspath(__file__))

# images directory ../src/assets/
images_dir = os.path.abspath(os.path.join(script_dir, '../src/assets/'))

# expected names:
expected_names = ['compact-minimal', 'cozy-minimal', 'compact', 'cozy' ]

print(f"Scanning images directory: {images_dir}")

# scan and get all .png and .svg files in the images directory that are NOT in the expected names list
image_files = []
for root, dirs, files in os.walk(images_dir):
	for file in files:
		if file.endswith('.png') or file.endswith('.svg'):
			name_without_extension = os.path.splitext(file)[0]
			if name_without_extension not in expected_names:
				print(f"Found image: {file}")
				image_files.append(os.path.join(root, file))

print(f"Found {len(image_files)} image files that do not match expected names.")

# try to match the found image files with the expected names and rename them accordingly
for image_file in image_files:
	# get the name of the image file without extension
	name_without_extension = os.path.splitext(os.path.basename(image_file))[0]
	
	# check if the name matches any of the expected names
	for expected_name in expected_names:
		if expected_name in name_without_extension:
			# construct the new file name
			new_file_name = f"{expected_name}{os.path.splitext(image_file)[1]}"
			new_file_path = os.path.join(os.path.dirname(image_file), new_file_name)
			
			# rename the file
			os.rename(image_file, new_file_path)
			print(f"Renamed '{name_without_extension}' to '{new_file_name}'")
			break

print("Renaming completed.")
