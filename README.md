## PreRequirements
- Blender installed and available
- Node installed and available

## Install Dependencies
- `npm install -g ts-node`

## Setup your env.json
- `BLENDERPATH`, as the path to your blender file. 
    - On MAC, use `/Applications/Blender.app/Contents/MacOS/blender`
    - On Windows, through Steam, use `C:\Program Files (x86)\Steam\steamapps\common\Blender\blender.exe`
    - On Linux, it might already be available as just `blender`
- `RESX` and `RESY`, as your end rendered image dimensions
- `RANGESTART` and `RANGEEND`, as the start (inclusive) and end (exclusive) range of your collection numbers
- `CANDYITEM`, as config passed to the final config files (more details [here](https://docs.metaplex.com/nft-standard))

## Modify scripts/python/finaltemplate.blend
- Use Blender to set the lighting, camera, and other default elements of your final template

## Build Asset Configs
- Run `ts-node -T ./scripts/typescript/buildassets.ts`

## Render
- Run `python3 ./scripts/python/finalrender.py`