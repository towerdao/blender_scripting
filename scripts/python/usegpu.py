import bpy

preferences = bpy.context.preferences.addons['cycles'].preferences
cuda_devices, opencl_devices = preferences.get_devices()
gpu_device = None

for device in preferences.devices:
    device.use = False #reset all other devices
    if device.type == "CUDA" and device in cuda_devices:
        gpu_device = device

bpy.context.scene.cycles.device = "GPU"
bpy.context.preferences.addons["cycles"].preferences.compute_device_type = gpu_device.type
gpu_device.use = True

for scene in bpy.data.scenes:
    scene.render.engine = "CYCLES"
    scene.cycles.device = 'GPU'
    
scene = bpy.context.scene
scene.cycles.device = 'GPU'
print("~~~~~> scene device: {}".format(scene.cycles.device))
prefs = bpy.context.preferences
cprefs = prefs.addons['cycles'].preferences
cuda, opencl = cprefs.get_devices()
print("~~~~~> cprefs: {}".format(cprefs))
print("~~~~~> cuda devices: {}".format(cuda))

cprefs.compute_device_type = 'CUDA'
print('~~~~~> compute device type set to', cprefs.compute_device_type)

for device in opencl:
    print('~~~~~> Deactivating', device)
    device.use = False
    print("~~~~~> device {} usage status: {}".format(device, device.use))

for device in cuda:
    print('~~~~~> Activating', device)
    device.use = (device.type != 'CPU')
    print("~~~~~> device {} usage status: {}".format(device, device.use))

bpy.ops.wm.save_userpref()
