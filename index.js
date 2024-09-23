import * as THREE from "three";

export function main() {
    var scene = new THREE.Scene();
    scene.background = new THREE.Color('beige');

    var camera = new THREE.OrthographicCamera(-innerWidth / 2, innerWidth / 2, innerHeight / 2, -innerHeight / 2, -10, 10);
    camera.position.set(0, 0, 10);
    camera.lookAt(scene.position);

    var renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(innerWidth, innerHeight);
    document.body.appendChild(renderer.domElement);

    window.addEventListener("resize", (event) => {
        camera.updateProjectionMatrix();
        renderer.setSize(innerWidth, innerHeight);
        renderer.render(scene, camera);
    });

    ///////////////////////// spline curve

    var curve = new THREE.SplineCurve([]),
        spline = new THREE.Line(
            new THREE.BufferGeometry(),
            new THREE.LineBasicMaterial({ color: 'black' })
        );

    scene.add(spline);

    ////////////////////////// mouse clicks
    window.addEventListener("click", onClick);

    function onClick(event) {
        var x = event.clientX - innerWidth / 2,
            y = innerHeight / 2 - event.clientY;

        ////////////////////// initial dot after click
        var point = new THREE.Mesh(
            new THREE.CircleGeometry(5),
            new THREE.MeshBasicMaterial({ color: 'black' })
        );
        point.position.set(x, y, 0);
        scene.add(point);

        //////////////////// add the point to the curve
        curve.points.push(new THREE.Vector2(x, y));
        curve = new THREE.SplineCurve(curve.points);
        var points = curve.getPoints(20 * curve.points.length);

        /////////////////// regenerate the image
        spline.geometry.dispose();
        spline.geometry = new THREE.BufferGeometry();
        spline.geometry.setFromPoints(points);

        renderer.render(scene, camera);
    }
}

// Calling the main function when the module is loaded
main();
