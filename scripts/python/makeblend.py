import sys
argv = sys.argv
argv = argv[argv.index("--") + 1:]  # get all args after "--"

index = argv[0]
resX = int(argv[1])
resY = int(argv[2])

import os

DIR = os.getcwd()

import bpy

import json

with open(os.path.join(DIR, f"./built/{index}.blend.json")) as jsonfile:
    pieces = json.load(jsonfile)

    #Get Pieces & Parts for specified pieces
    for piece in pieces.keys():
        if pieces[piece] is not None:
            bpy.ops.wm.open_mainfile(filepath = os.path.join(DIR, f"./raw_pieces/{piece}/{pieces[piece]}.blend"))

            try:
                bpy.ops.file.pack_all()
            except:
                print("")
            

            obj_blacklist = []
            valid_pieces = [obj.name for obj in bpy.context.scene.objects if obj.name not in obj_blacklist]

            pieces[piece] = { 'name': pieces[piece], 'parts': valid_pieces }

    #Open Template
    bpy.ops.wm.open_mainfile(filepath = os.path.join(DIR, "./scripts/python/finaltemplate.blend"))
    bpy.context.scene.render.resolution_x = resX
    bpy.context.scene.render.resolution_y = resY
    bpy.context.scene.frame_end = 1
    bpy.context.scene.frame_set(1)

    bpy.context.scene.render.filepath = f"//{index}.png"

    #Put these Pieces & Parts in this file
    for piece in pieces.keys():
        if pieces[piece] is not None:
            file_path = os.path.join(DIR, f"./raw_pieces/{piece}/{pieces[piece]['name']}.blend")
            
            for part in pieces[piece]['parts']:
                inner_path = 'Object'
                object_name = part
                
                bpy.ops.wm.append(
                    filepath = os.path.join(file_path, inner_path, object_name),
                    directory = os.path.join(file_path, inner_path),
                    filename = object_name,
                    link = True
                )

    bpy.ops.file.find_missing_files(directory=DIR)

    bpy.ops.file.pack_all() #Pack all images into the file

    #Save File
    bpy.ops.wm.save_as_mainfile(filepath = os.path.join(DIR, f"./built/{index}.blend"))
