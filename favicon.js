document.addEventListener('DOMContentLoaded', (event) => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, 64, 64);

    ctx.fillStyle = '#000';
    const radii = [22, 14, 14, 14, 14, 14, 14];
    const angles = [0, 0, Math.PI / 3, Math.PI / 3, -Math.PI / 3, -Math.PI / 3, 2 * Math.PI / 3];
    const offsets = [
        { x: 32, y: 32 },
        { x: 32, y: 10 },
        { x: 32 + 22 * Math.cos(Math.PI / 6), y: 10 + 22 * Math.sin(Math.PI / 6) },
        { x: 32 - 22 * Math.cos(Math.PI / 6), y: 10 + 22 * Math.sin(Math.PI / 6) },
        { x: 32 - 22 * Math.cos(Math.PI / 6), y: 54 - 22 * Math.sin(Math.PI / 6) },
        { x: 32 + 22 * Math.cos(Math.PI / 6), y: 54 - 22 * Math.sin(Math.PI / 6) },
        { x: 32, y: 54 },
    ];

    for (let i = 0; i < radii.length; i++) {
        ctx.beginPath();
        ctx.arc(offsets[i].x, offsets[i].y, radii[i], angles[i], angles[i] + 2 * Math.PI / 3);
        ctx.lineTo(offsets[i].x, offsets[i].y);
        ctx.fill();
    }

    const link = document.querySelector('#favicon');
    link.href = canvas.toDataURL('image/x-icon');
});
