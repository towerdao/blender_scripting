import subprocess

import os
import json

DIR = os.getcwd()

with open(os.path.join(DIR, f"./env.json")) as jsonfile:
    env = json.load(jsonfile)

    BLENDERPATH = env['BLENDERPATH']
    RESX = env['RESX']
    RESY = env['RESY']
    RANGESTART = env['RANGESTART']
    RANGEEND = env['RANGEEND']

    def blender_run(index):
        if os.path.exists(f"./built/{index}.blend"):
            raise Exception(f"File \"./built/${index}.blend\" already exists")
            
        blender_run1 = f"{BLENDERPATH} -b -P ./scripts/python/makeblend.py -- {index} {RESX} {RESY}"
        subprocess.run(blender_run1, shell=True, check=True)
        blender_run2 = f"{BLENDERPATH} -P ./scripts/python/usegpu.py -b ./built/{index}.blend -E CYCLES -o ./built/{index}.png -f 1"
        subprocess.run(blender_run2, shell=True, check=True)

        outRenderFileName = f"./built/{index}.png"
        outRenderFileNamePadded = f"./built/{index}.png0001.png"
        if os.path.exists(outRenderFileName):
            os.remove(outRenderFileName)
        os.rename(outRenderFileNamePadded, outRenderFileName)

        print(f"Rendered {index}")

    for index in range(RANGESTART, RANGEEND):
        blender_run(index)
        print("")
