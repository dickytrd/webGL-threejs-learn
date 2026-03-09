const simpleFrag = `
uniform vec3 colorA; 
uniform vec3 colorB; 
uniform float uTime;
varying vec2 vUv;

float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

void main() {

    float shift = 0.5 + 0.5 * sin(uTime);

    float noise = rand(vUv * uTime) * 1.;

    float fresnel = pow(2.0 - abs(vUv.x - 0.5) * 2.0, 2.0);

    vec3 color = mix(colorA, colorB, vUv.x + shift * 0.1);

    float alpha = 0.1 + noise + fresnel * 2.;

    gl_FragColor = vec4(color, alpha);
}
`;