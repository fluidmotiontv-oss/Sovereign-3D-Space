import bpy
import math

def setup_sovereign_scene():
    """
    Initializes a sovereign 3D scene with Horizon Engine presets.
    Automates lighting, camera framing, and material assignment.
    """
    # Clear existing mesh objects
    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.object.delete(use_global=False)

    # Create Dragon Core (IcoSphere)
    bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=5, radius=1, location=(0, 0, 0))
    dragon_core = bpy.context.active_object
    dragon_core.name = "Dragon_Core"

    # Assign Shader (Cycles Emission/Refraction)
    mat = bpy.data.materials.new(name="Horizon_Plasma")
    mat.use_nodes = True
    nodes = mat.node_tree.nodes
    
    # Remove default principled
    nodes.remove(nodes.get("Principled BSDF"))
    
    # Create Emission Node
    emission = nodes.new(type='ShaderNodeEmission')
    emission.inputs['Strength'].default_value = 5.0
    emission.inputs['Color'].default_value = (1, 0.2, 0.05, 1) # Plasma Orange
    
    output = nodes.get("Material Output")
    mat.node_tree.links.new(emission.outputs['Emission'], output.inputs['Surface'])
    
    dragon_core.data.materials.append(mat)

    # Camera Setup
    bpy.ops.object.camera_add(location=(0, -8, 0), rotation=(math.radians(90), 0, 0))
    cam = bpy.context.active_object
    bpy.context.scene.camera = cam

    # Lighting: High-Contrast Sovereign Preset
    bpy.ops.object.light_add(type='AREA', location=(5, -5, 5))
    light = bpy.context.active_object
    light.data.energy = 500
    light.data.size = 2

    # Render Settings
    bpy.context.scene.render.engine = 'CYCLES'
    bpy.context.scene.cycles.samples = 128
    bpy.context.scene.render.resolution_x = 1920
    bpy.context.scene.render.resolution_y = 1080
    
    print("Sovereign Horizon Scene Initialized.")

if __name__ == "__main__":
    setup_sovereign_scene()
