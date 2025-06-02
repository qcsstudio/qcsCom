import * as THREE from "three";

const PLANE_WIDTH = 50;
const PLANE_HEIGHT = 80;
const COLORS_COUNT = 5;
const clock = new THREE.Clock();

export class NeatGradient {
    constructor(config) {
        const {
            ref,
            speed = 4,
            horizontalPressure = 3,
            verticalPressure = 3,
            waveFrequencyX = 5,
            waveFrequencyY = 5,
            waveAmplitude = 3,
            colors,
            highlights = 4,
            shadows = 4,
            colorSaturation = 0,
            colorBrightness = 1,
            colorBlending = 5,
            grainScale = 2,
            grainIntensity = 0.55,
            grainSparsity = 0.0,
            grainSpeed = 0.1,
            wireframe = false,
            backgroundColor = "#FFFFFF",
            backgroundAlpha = 1.0,
            resolution = 1,
            seed,
            yOffset = 0
        } = config;

        if (!ref || !(ref instanceof HTMLCanvasElement)) {
            throw new Error("Please provide a valid canvas element as 'ref'");
        }

        this._ref = ref;
        this.speed = speed;
        this.horizontalPressure = horizontalPressure;
        this.verticalPressure = verticalPressure;
        this.waveFrequencyX = waveFrequencyX;
        this.waveFrequencyY = waveFrequencyY;
        this.waveAmplitude = waveAmplitude;
        this.colors = colors;
        this.shadows = shadows;
        this.highlights = highlights;
        this.colorSaturation = colorSaturation;
        this.colorBrightness = colorBrightness;
        this.colorBlending = colorBlending;
        this.grainScale = grainScale;
        this.grainIntensity = grainIntensity;
        this.grainSparsity = grainSparsity;
        this.grainSpeed = grainSpeed;
        this.wireframe = wireframe;
        this.backgroundColor = backgroundColor;
        this.backgroundAlpha = backgroundAlpha;
        this.yOffset = yOffset;

        this.sceneState = this._initScene(resolution);

        let tick = seed !== undefined ? seed : getElapsedSecondsInLastHour();

        const render = () => {
            const { renderer, camera, scene, meshes } = this.sceneState;
            const width = this._ref.width;
            const height = this._ref.height;

            tick += clock.getDelta() * this._speed;

            meshes.forEach(mesh => {
                const uniforms = mesh.material.uniforms;
                uniforms.u_time.value = tick;
                uniforms.u_resolution.value = new THREE.Vector2(width, height);
                uniforms.u_color_pressure.value = new THREE.Vector2(this._horizontalPressure, this._verticalPressure);
                uniforms.u_wave_frequency_x.value = this._waveFrequencyX;
                uniforms.u_wave_frequency_y.value = this._waveFrequencyY;
                uniforms.u_wave_amplitude.value = this._waveAmplitude;
                uniforms.u_plane_width.value = PLANE_WIDTH;
                uniforms.u_plane_height.value = PLANE_HEIGHT;
                uniforms.u_color_blending.value = this._colorBlending;
                uniforms.u_colors.value = this._colors;
                uniforms.u_colors_count.value = COLORS_COUNT;
                uniforms.u_shadows.value = this._shadows;
                uniforms.u_highlights.value = this._highlights;
                uniforms.u_saturation.value = this._saturation;
                uniforms.u_brightness.value = this._brightness;
                uniforms.u_grain_intensity.value = this._grainIntensity;
                uniforms.u_grain_sparsity.value = this._grainSparsity;
                uniforms.u_grain_speed.value = this._grainSpeed;
                uniforms.u_grain_scale.value = this._grainScale;
                uniforms.u_y_offset.value = this._yOffset;
                mesh.material.wireframe = this._wireframe;
            });

            renderer.render(scene, camera);
            this.requestRef = requestAnimationFrame(render);
        };

        const setSize = () => {
            const { renderer } = this.sceneState;
            const canvas = renderer.domElement;
            const width = canvas.clientWidth;
            const height = canvas.clientHeight;
            this.sceneState.renderer.setSize(width, height, false);
            updateCamera(this.sceneState.camera, width, height);
        };

        this.sizeObserver = new ResizeObserver(() => setSize());
        this.sizeObserver.observe(ref);

        render();
    }

    destroy() {
        cancelAnimationFrame(this.requestRef);
        this.sizeObserver.disconnect();
    }

    set speed(val) { this._speed = val / 20; }
    set horizontalPressure(val) { this._horizontalPressure = val / 4; }
    set verticalPressure(val) { this._verticalPressure = val / 4; }
    set waveFrequencyX(val) { this._waveFrequencyX = val * 0.04; }
    set waveFrequencyY(val) { this._waveFrequencyY = val * 0.04; }
    set waveAmplitude(val) { this._waveAmplitude = val * 0.75; }
    set colors(val) {
        this._colors = [...val.map(c => ({
            is_active: true,
            color: new THREE.Color(c.color),
            influence: 1,
        })), ...Array.from({ length: COLORS_COUNT - val.length }).map(() => ({
            is_active: false,
            color: new THREE.Color(0x000000),
            influence: 0
        }))];
    }
    set highlights(val) { this._highlights = val / 100; }
    set shadows(val) { this._shadows = val / 100; }
    set colorSaturation(val) { this._saturation = val / 10; }
    set colorBrightness(val) { this._brightness = val; }
    set colorBlending(val) { this._colorBlending = val / 10; }
    set grainScale(val) { this._grainScale = val == 0 ? 1 : val; }
    set grainIntensity(val) { this._grainIntensity = val; }
    set grainSparsity(val) { this._grainSparsity = val; }
    set grainSpeed(val) { this._grainSpeed = val; }
    set wireframe(val) { this._wireframe = val; }
    set backgroundColor(val) { this._backgroundColor = val; }
    set backgroundAlpha(val) { this._backgroundAlpha = val; }
    set yOffset(val) { this._yOffset = val; }

    _initScene(resolution) {
        const width = this._ref.width, height = this._ref.height;
        const renderer = new THREE.WebGLRenderer({ alpha: true, canvas: this._ref });
        renderer.setClearColor(0x000000, 0);
        renderer.setSize(width, height, false);

        const scene = new THREE.Scene();

        const geometry = new THREE.PlaneGeometry(PLANE_WIDTH, PLANE_HEIGHT, 60, 60);
        const material = new THREE.MeshBasicMaterial({ color: 0x111111, wireframe: this._wireframe });
        const plane = new THREE.Mesh(geometry, material);

        plane.rotation.x = -Math.PI / 3.5;
        plane.position.z = -1;
        scene.add(plane);

        const camera = new THREE.OrthographicCamera();
        camera.position.z = 5;
        updateCamera(camera, width, height);

        return { renderer, camera, scene, meshes: [plane] };
    }
}

export function updateCamera(camera, width, height) {
    camera.left = -width / 100;
    camera.right = width / 100;
    camera.top = height / 100;
    camera.bottom = -height / 100;
    camera.updateProjectionMatrix();
}

export function getElapsedSecondsInLastHour() {
    const now = new Date();
    return (now.getMinutes() * 60) + now.getSeconds();
}

export function generateRandomString(length = 8) {
    return Math.random().toString(36).substring(2, 2 + length);
}
