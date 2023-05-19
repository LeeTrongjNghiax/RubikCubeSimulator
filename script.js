const RUBIK_CUBE = '011111111102222222220333333333044444444405555555550666666666';

const FACE_TURN = [
[8, 6, 4, 2], 
[9, 7, 5, 3], 
[9, 5, 3, 7], 
[2, 6, 4, 8], 
[3, 7, 5, 9]
];
const SLICE_TURN = [
[1, 1, 1, 1], 
[2, 6, 8, 4], 
[6, 2, 4, 8]
];
const INNER_LAYER = [
[0, 4, 3, 1], // M
[1, 5, 4, 2], // E
[2, 3, 5, 0], // S_prime
];
const OUTER_LAYER = [
[0, 2, 4, 5, 1], // U
[1, 0, 5, 3, 2], // F
[2, 1, 3, 4, 0], // R
];
const ORIENTATION = [
[00, 10, 30, 40], // x
[10, 20, 40, 50], // y
[00, 50, 30, 20], // z
]

for (let i = 0; i < 3; i++) {
let arr = [];
arr.push( OUTER_LAYER[i][0] + 3 );
for (let j = 1; j < OUTER_LAYER[i].length; j++) {
    let sign = (j % 2 == 0) ? -1 : 1;
    arr.push( OUTER_LAYER[i][ j + sign ] );
}
OUTER_LAYER.push(arr);
}

let moves = [];

for (let i = 0; i < OUTER_LAYER.length; i++) {
let layerMove = [];
for (let j = 0; j < 2; j++) {
    layerMove.push(
    FACE_TURN[j].map(
        x => x + 10 * OUTER_LAYER[i][0]
    )
    );
}
for (let j = 2; j < 5; j++) {
    layerMove.push(
    FACE_TURN[j].map(
        (x, k) => x + 10 * OUTER_LAYER[i][k + 1]
    )
    );
}
moves.push(layerMove);
}

for (let i = 0; i < INNER_LAYER.length; i++) {
let sliceMove = [];
for (let j = 0; j < SLICE_TURN.length; j++) {
    sliceMove.push(
    SLICE_TURN[j].map(
        (x, k) => x + 10 * INNER_LAYER[i][k]
    )
    );
}
moves.push(sliceMove);
}

moves[8] = moves[8].map( arr => JSON.parse( JSON.stringify(arr) ).reverse() );

numberToColor = (num) => {
switch (parseInt(num)) {
    case 1: return 'white';
    case 2: return 'green';
    case 3: return 'red';
    case 4: return 'yellow';
    case 5: return 'blue';
    case 6: return 'orange';
    default: return 'gray';
}
}

changeRotationStatus = (string, position, count = 1) => {
let arr = string.split("");

for (let c = 0; c < count; c++)
    arr[ position ] = (+arr[ position ] + 1) % 4;

return arr.join('');
}

multipleSeriesSwap = (string, positions, count = 1) => {
for (let c = 0; c < count; c++)
    for (let i = 0; i < positions.length; i++)
    string = seriesSwap(string, positions[i]);

return string;
}

seriesSwap = (string, positions, count = 1) => {
let arr = string.split("");

for (let c = 0; c < count; c++) {
    let temp = arr[ positions[0] ];
    for (let i = 0; i < positions.length - 1; i++)
    arr[ positions[i] ] = arr[ positions[i + 1] ];

    arr[ positions[ positions.length - 1 ] ] = temp;
}

return arr.join('');
}

turn = (string, directions) => {
let arr = directions.split(" ");

for (let i = 0; i < arr.length; i++) {
    string = turnOne(string, arr[i]);
}

return string;
}

turnOne = (string, direction) => {
switch (direction) {
    case "U": string = multipleSeriesSwap(string, moves[0]); string = changeRotationStatus(string, 00); break;
    case "D": string = multipleSeriesSwap(string, moves[3]); string = changeRotationStatus(string, 30); break;
    case "F": string = multipleSeriesSwap(string, moves[1]); string = changeRotationStatus(string, 10); break;
    case "B": string = multipleSeriesSwap(string, moves[4]); string = changeRotationStatus(string, 40); break;
    case "R": string = multipleSeriesSwap(string, moves[2]); string = changeRotationStatus(string, 20); break;
    case "L": string = multipleSeriesSwap(string, moves[5]); string = changeRotationStatus(string, 50); break;

    case "U'": string = multipleSeriesSwap(string, moves[0], 3); string = changeRotationStatus(string, 00, 3); break;
    case "D'": string = multipleSeriesSwap(string, moves[3], 3); string = changeRotationStatus(string, 30, 3); break;
    case "F'": string = multipleSeriesSwap(string, moves[1], 3); string = changeRotationStatus(string, 10, 3); break;
    case "B'": string = multipleSeriesSwap(string, moves[4], 3); string = changeRotationStatus(string, 40, 3); break;
    case "R'": string = multipleSeriesSwap(string, moves[2], 3); string = changeRotationStatus(string, 20, 3); break;
    case "L'": string = multipleSeriesSwap(string, moves[5], 3); string = changeRotationStatus(string, 50, 3); break;

    case "U2": string = multipleSeriesSwap(string, moves[0], 2); string = changeRotationStatus(string, 00, 2); break;
    case "D2": string = multipleSeriesSwap(string, moves[3], 2); string = changeRotationStatus(string, 30, 2); break;
    case "F2": string = multipleSeriesSwap(string, moves[1], 2); string = changeRotationStatus(string, 10, 2); break;
    case "B2": string = multipleSeriesSwap(string, moves[4], 2); string = changeRotationStatus(string, 40, 2); break;
    case "R2": string = multipleSeriesSwap(string, moves[2], 2); string = changeRotationStatus(string, 20, 2); break;
    case "L2": string = multipleSeriesSwap(string, moves[5], 2); string = changeRotationStatus(string, 50, 2); break;



    case "u": string = multipleSeriesSwap(string, moves[0]); string = multipleSeriesSwap(string, moves[7], 3); string = changeRotationStatus(string, 00); string = seriesSwap(string, ORIENTATION[1], 1); break;
    case "d": string = multipleSeriesSwap(string, moves[3]); string = multipleSeriesSwap(string, moves[7], 1); string = changeRotationStatus(string, 30); string = seriesSwap(string, ORIENTATION[1], 3); break;
    case "f": string = multipleSeriesSwap(string, moves[1]); string = multipleSeriesSwap(string, moves[8], 1); string = changeRotationStatus(string, 10); string = seriesSwap(string, ORIENTATION[2], 1); break;
    case "b": string = multipleSeriesSwap(string, moves[4]); string = multipleSeriesSwap(string, moves[8], 3); string = changeRotationStatus(string, 40); string = seriesSwap(string, ORIENTATION[2], 3); break;
    case "r": string = multipleSeriesSwap(string, moves[2]); string = multipleSeriesSwap(string, moves[6], 3); string = changeRotationStatus(string, 20); string = seriesSwap(string, ORIENTATION[0], 1); break;
    case "l": string = multipleSeriesSwap(string, moves[5]); string = multipleSeriesSwap(string, moves[6], 1); string = changeRotationStatus(string, 50); string = seriesSwap(string, ORIENTATION[0], 3); break;

    case "u'": string = multipleSeriesSwap(string, moves[0], 3); string = multipleSeriesSwap(string, moves[7], 1); string = changeRotationStatus(string, 00, 3); string = seriesSwap(string, ORIENTATION[1], 3); break;
    case "d'": string = multipleSeriesSwap(string, moves[3], 3); string = multipleSeriesSwap(string, moves[7], 3); string = changeRotationStatus(string, 30, 3); string = seriesSwap(string, ORIENTATION[1], 1); break;
    case "f'": string = multipleSeriesSwap(string, moves[1], 3); string = multipleSeriesSwap(string, moves[8], 3); string = changeRotationStatus(string, 10, 3); string = seriesSwap(string, ORIENTATION[2], 3); break;
    case "b'": string = multipleSeriesSwap(string, moves[4], 3); string = multipleSeriesSwap(string, moves[8], 1); string = changeRotationStatus(string, 40, 3); string = seriesSwap(string, ORIENTATION[2], 1); break;
    case "r'": string = multipleSeriesSwap(string, moves[2], 3); string = multipleSeriesSwap(string, moves[6], 1); string = changeRotationStatus(string, 20, 3); string = seriesSwap(string, ORIENTATION[0], 3); break;
    case "l'": string = multipleSeriesSwap(string, moves[5], 3); string = multipleSeriesSwap(string, moves[6], 3); string = changeRotationStatus(string, 50, 3); string = seriesSwap(string, ORIENTATION[0], 1); break;

    case "u2": string = multipleSeriesSwap(string, moves[0], 2); string = multipleSeriesSwap(string, moves[7], 2); string = changeRotationStatus(string, 00, 2); string = seriesSwap(string, ORIENTATION[1], 2); break;
    case "d2": string = multipleSeriesSwap(string, moves[3], 2); string = multipleSeriesSwap(string, moves[7], 2); string = changeRotationStatus(string, 30, 2); string = seriesSwap(string, ORIENTATION[1], 2); break;
    case "f2": string = multipleSeriesSwap(string, moves[1], 2); string = multipleSeriesSwap(string, moves[8], 2); string = changeRotationStatus(string, 10, 2); string = seriesSwap(string, ORIENTATION[2], 2); break;
    case "b2": string = multipleSeriesSwap(string, moves[4], 2); string = multipleSeriesSwap(string, moves[8], 2); string = changeRotationStatus(string, 40, 2); string = seriesSwap(string, ORIENTATION[2], 2); break;
    case "r2": string = multipleSeriesSwap(string, moves[2], 2); string = multipleSeriesSwap(string, moves[6], 2); string = changeRotationStatus(string, 20, 2); string = seriesSwap(string, ORIENTATION[0], 2); break;
    case "l2": string = multipleSeriesSwap(string, moves[5], 2); string = multipleSeriesSwap(string, moves[6], 2); string = changeRotationStatus(string, 50, 2); string = seriesSwap(string, ORIENTATION[0], 2); break;


    
    case "M": string = multipleSeriesSwap(string, moves[6]); string = seriesSwap(string, ORIENTATION[0], 3); break;
    case "E": string = multipleSeriesSwap(string, moves[7]); string = seriesSwap(string, ORIENTATION[1], 3); break;
    case "S": string = multipleSeriesSwap(string, moves[8]); string = seriesSwap(string, ORIENTATION[2], 1); break;

    case "M'": string = multipleSeriesSwap(string, moves[6], 3); string = seriesSwap(string, ORIENTATION[0], 1); break;
    case "E'": string = multipleSeriesSwap(string, moves[7], 3); string = seriesSwap(string, ORIENTATION[1], 1); break;
    case "S'": string = multipleSeriesSwap(string, moves[8], 3); string = seriesSwap(string, ORIENTATION[2], 3); break;
    
    case "M2": string = multipleSeriesSwap(string, moves[6], 2); string = seriesSwap(string, ORIENTATION[0], 2); break;
    case "E2": string = multipleSeriesSwap(string, moves[7], 2); string = seriesSwap(string, ORIENTATION[1], 2); break;
    case "S2": string = multipleSeriesSwap(string, moves[8], 2); string = seriesSwap(string, ORIENTATION[2], 2); break;
    


    case "x": string = multipleSeriesSwap(string, moves[2]); string = multipleSeriesSwap(string, moves[6], 3); string = multipleSeriesSwap(string, moves[5], 3); break;
    case "y": string = multipleSeriesSwap(string, moves[0]); string = multipleSeriesSwap(string, moves[7], 3); string = multipleSeriesSwap(string, moves[3], 3); break;
    case "z": string = multipleSeriesSwap(string, moves[1]); string = multipleSeriesSwap(string, moves[8], 1); string = multipleSeriesSwap(string, moves[4], 3); break;

    case "x'": string = multipleSeriesSwap(string, moves[2], 3); string = multipleSeriesSwap(string, moves[6], 1); string = multipleSeriesSwap(string, moves[5]); break;
    case "y'": string = multipleSeriesSwap(string, moves[0], 3); string = multipleSeriesSwap(string, moves[7], 1); string = multipleSeriesSwap(string, moves[3]); break;
    case "z'": string = multipleSeriesSwap(string, moves[1], 3); string = multipleSeriesSwap(string, moves[8], 3); string = multipleSeriesSwap(string, moves[4]); break;

    case "x2": string = multipleSeriesSwap(string, moves[2], 2); string = multipleSeriesSwap(string, moves[6], 2); string = multipleSeriesSwap(string, moves[5], 2); break;
    case "y2": string = multipleSeriesSwap(string, moves[0], 2); string = multipleSeriesSwap(string, moves[7], 2); string = multipleSeriesSwap(string, moves[3], 2); break;
    case "z2": string = multipleSeriesSwap(string, moves[1], 2); string = multipleSeriesSwap(string, moves[8], 2); string = multipleSeriesSwap(string, moves[4], 2); break;
}

return string;
}

stringImageTo3DImage = (string) => `
<svg viewBox='-0.9 -0.9 1.8 1.8' class="rubik3d">
    <rect fill='var(--rubik-background-color)' x='-0.9' y='-0.9' width='1.8' height='1.8'/>
    <g>
    <polygon fill='var(--rubik-${numberToColor(string.substring(5, 6))}-color)' stroke='#000000' points='-4.94395492722E-17,-0.747570645647 0.195987546512,-0.662774614696 -1.69795801266E-17,-0.571237209618 -0.195987546512,-0.662774614696'/>
    <polygon fill='var(--rubik-${numberToColor(string.substring(6, 7))}-color)' stroke='#000000' points='0.232005309244,-0.646547084507 0.443574072948,-0.555009679429 0.248231527177,-0.455893701578 0.0360177627316,-0.555009679429'/>
    <polygon fill='var(--rubik-${numberToColor(string.substring(7, 8))}-color)' stroke='#000000' points='0.482583855536,-0.537431994052 0.711668838657,-0.4383160162 0.517783415392,-0.330639653666 0.287241309765,-0.4383160162'/>

    <polygon fill='var(--rubik-${numberToColor(string.substring(4, 5))}-color)' stroke='#000000' points='-0.232005309244,-0.646547084507 -0.0360177627316,-0.555009679429 -0.248231527177,-0.455893701578 -0.443574072948,-0.555009679429'/>
    <polygon fill='var(--rubik-${numberToColor(string.substring(1, 2))}-color)' stroke='#000000' points='-1.19067117689E-17,-0.537431994052 0.212213764446,-0.4383160162 1.31258271398E-17,-0.330639653666 -0.212213764446,-0.4383160162'/>
    <polygon fill='var(--rubik-${numberToColor(string.substring(8, 9))}-color)' stroke='#000000' points='0.251353447717,-0.419212035245 0.481895553344,-0.311535672712 0.270508995897,-0.19413986641 0.039139683271,-0.311535672712'/>

    <polygon fill='var(--rubik-${numberToColor(string.substring(3, 4))}-color)' stroke='#000000' points='-0.482583855536,-0.537431994052 -0.287241309765,-0.4383160162 -0.517783415392,-0.330639653666 -0.711668838657,-0.4383160162'/>
    <polygon fill='var(--rubik-${numberToColor(string.substring(2, 3))}-color)' stroke='#000000' points='-0.251353447717,-0.419212035245 -0.039139683271,-0.311535672712 -0.270508995897,-0.19413986641 -0.481895553344,-0.311535672712'/>
    <polygon fill='var(--rubik-${numberToColor(string.substring(9, 10))}-color)' stroke='#000000' points='1.92197429271E-17,-0.290697160276 0.231369312626,-0.173301353974 6.32515829415E-17,-0.0448079088972 -0.231369312626,-0.173301353974'/>



    <polygon fill='var(--rubik-${numberToColor(string.substring(29, 30))}-color)' stroke='#000000' points='0.0195723118985,-0.0109626610455 0.250941624524,-0.139456106122 0.241391846748,0.126727563228 0.0195723118985,0.261716201016'/>
    <polygon fill='var(--rubik-${numberToColor(string.substring(22, 23))}-color)' stroke='#000000' points='0.289305344891,-0.161716522847 0.500691902338,-0.279112329149 0.48317508531,-0.0193241313 0.279755567114,0.104467146503'/>
    <polygon fill='var(--rubik-${numberToColor(string.substring(23, 24))}-color)' stroke='#000000' points='0.535862871621,-0.299523577255 0.729748294886,-0.407199939789 0.705563815696,-0.153667051647 0.518346054594,-0.0397353794067'/>

    <polygon fill='var(--rubik-${numberToColor(string.substring(28, 29))}-color)' stroke='#000000' points='0.0187964861684,0.30740091162 0.240616021018,0.172412273832 0.23182332941,0.417493465286 0.0187964861684,0.557525119942'/>
    <polygon fill='var(--rubik-${numberToColor(string.substring(21, 22))}-color)' stroke='#000000' points='0.277484981547,0.149131684797 0.480904499743,0.0253404069942 0.464720974424,0.265354838312 0.26869228994,0.394212876251'/>
    <polygon fill='var(--rubik-${numberToColor(string.substring(24, 25))}-color)' stroke='#000000' points='0.514822720476,0.00392025149203 0.702040481578,-0.110011420748 0.679626178607,0.124964198255 0.498639195158,0.24393468281'/>

    <polygon fill='var(--rubik-${numberToColor(string.substring(27, 28))}-color)' stroke='#000000' points='0.0180798211904,0.599570709585 0.231106664432,0.459539054929 0.222984461349,0.685931529237 0.0180798211904,0.829827540014'/>
    <polygon fill='var(--rubik-${numberToColor(string.substring(26, 27))}-color)' stroke='#000000' points='0.266593210281,0.435462585597 0.462621894766,0.306604547658 0.447625016912,0.529020062126 0.258471007198,0.661855059905'/>
    <polygon fill='var(--rubik-${numberToColor(string.substring(25, 26))}-color)' stroke='#000000' points='0.495373153236,0.284381590748 0.676360136685,0.165411106194 0.655528520228,0.383794964844 0.480376275383,0.506797105216'/>



    <polygon fill='var(--rubik-${numberToColor(string.substring(17, 18))}-color)' stroke='#000000' points='-0.730336618018,-0.406648000697 -0.536451194753,-0.298971638163 -0.518934377726,-0.0391834403149 -0.706152138828,-0.153115112555'/>
    <polygon fill='var(--rubik-${numberToColor(string.substring(18, 19))}-color)' stroke='#000000' points='-0.501394876389,-0.27854802284 -0.290008318942,-0.161152216538 -0.280458541166,0.105031452812 -0.483878059362,-0.0187598249911'/>
    <polygon fill='var(--rubik-${numberToColor(string.substring(19, 20))}-color)' stroke='#000000' points='-0.251784251975,-0.138883000883 -0.0204149393493,-0.0103895558063 -0.0204149393493,0.262289306255 -0.242234474199,0.127300668467'/>

    <polygon fill='var(--rubik-${numberToColor(string.substring(16, 17))}-color)' stroke='#000000' points='-0.702590256077,-0.109566819661 -0.515372494975,0.0043648525786 -0.499188969657,0.244379283896 -0.680175953105,0.125408799342'/>
    <polygon fill='var(--rubik-${numberToColor(string.substring(11, 12))}-color)' stroke='#000000' points='-0.481556632129,0.025787474065 -0.278137113933,0.149578751868 -0.269344422326,0.394659943322 -0.465373106811,0.265801905383'/>
    <polygon fill='var(--rubik-${numberToColor(string.substring(12, 13))}-color)' stroke='#000000' points='-0.241391846748,0.172857245909 -0.0195723118985,0.307845883697 -0.0195723118985,0.557970092018 -0.23259915514,0.417938437362'/>

    <polygon fill='var(--rubik-${numberToColor(string.substring(15, 16))}-color)' stroke='#000000' points='-0.676874966562,0.165766840531 -0.495887983113,0.284737325085 -0.480891105259,0.507152839553 -0.656043350105,0.384150699181'/>
    <polygon fill='var(--rubik-${numberToColor(string.substring(14, 15))}-color)' stroke='#000000' points='-0.463228483716,0.306955455879 -0.267199799232,0.435813493818 -0.259077596148,0.662205968126 -0.448231605863,0.529370970347'/>
    <polygon fill='var(--rubik-${numberToColor(string.substring(13, 14))}-color)' stroke='#000000' points='-0.23182332941,0.459880027528 -0.0187964861684,0.599911682184 -0.0187964861684,0.830168512613 -0.223701126327,0.686272501836'/>
    </g>
</svg>
`;

stringImageTo2DImage = (string) => `
<svg viewBox='-0.9 -0.9 1.8 1.8' class="rubik2d">
    <rect fill='var(--rubik-background-color)' x='-0.9' y='-0.9' width='1.8' height='1.8'/>
    <g style='stroke-width:0.1;stroke-linejoin:round;opacity:1'>
    <polygon fill='var(--white)' stroke='#000000' points='-0.52222222222222,-0.52222222222222 0.52222222222222,-0.52222222222222 0.52222222222222,0.52222222222222 -0.52222222222222,0.52222222222222'/>
    </g>
    <g style='opacity:1;stroke-opacity:0.5;stroke-width:0;stroke-linejoin:round'>
    <polygon fill='var(--rubik-${numberToColor(string.substring(5, 6))}-color)' stroke='#000000' points='-0.52777777777778,-0.52777777777778 -0.21296296296296,-0.52777777777778 -0.21296296296296,-0.21296296296296 -0.52777777777778,-0.21296296296296'/>
    <polygon fill='var(--rubik-${numberToColor(string.substring(6, 7))}-color)' stroke='#000000' points='-0.15740740740741,-0.52777777777778 0.15740740740741,-0.52777777777778 0.15740740740741,-0.21296296296296 -0.15740740740741,-0.21296296296296'/>
    <polygon fill='var(--rubik-${numberToColor(string.substring(7, 8))}-color)' stroke='#000000' points='0.21296296296296,-0.52777777777778 0.52777777777778,-0.52777777777778 0.52777777777778,-0.21296296296296 0.21296296296296,-0.21296296296296'/>
    
    <polygon fill='var(--rubik-${numberToColor(string.substring(4, 5))}-color)' stroke='#000000' points='-0.52777777777778,-0.15740740740741 -0.21296296296296,-0.15740740740741 -0.21296296296296,0.15740740740741 -0.52777777777778,0.15740740740741'/>
    <polygon fill='var(--rubik-${numberToColor(string.substring(1, 2))}-color)' stroke='#000000' points='-0.15740740740741,-0.15740740740741 0.15740740740741,-0.15740740740741 0.15740740740741,0.15740740740741 -0.15740740740741,0.15740740740741'/>
    <polygon fill='var(--rubik-${numberToColor(string.substring(8, 9))}-color)' stroke='#000000' points='0.21296296296296,-0.15740740740741 0.52777777777778,-0.15740740740741 0.52777777777778,0.15740740740741 0.21296296296296,0.15740740740741'/>
    
    <polygon fill='var(--rubik-${numberToColor(string.substring(3, 4))}-color)' stroke='#000000' points='-0.52777777777778,0.21296296296296 -0.21296296296296,0.21296296296296 -0.21296296296296,0.52777777777778 -0.52777777777778,0.52777777777778'/>
    <polygon fill='var(--rubik-${numberToColor(string.substring(2, 3))}-color)' stroke='#000000' points='-0.15740740740741,0.21296296296296 0.15740740740741,0.21296296296296 0.15740740740741,0.52777777777778 -0.15740740740741,0.52777777777778'/>
    <polygon fill='var(--rubik-${numberToColor(string.substring(9, 10))}-color)' stroke='#000000' points='0.21296296296296,0.21296296296296 0.52777777777778,0.21296296296296 0.52777777777778,0.52777777777778 0.21296296296296,0.52777777777778'/>
    </g>
    <g style='opacity:1;stroke-opacity:1;stroke-width:0.02;stroke-linejoin:round'>
    <polygon fill='var(--rubik-${numberToColor(string.substring(17, 18))}-color)' stroke='#000000' points='-0.54406130268199,0.5544061302682 -0.19591315453384,0.5544061302682 -0.18390804597701,0.7183908045977 -0.50804597701149,0.7183908045977'/>
    <polygon fill='var(--rubik-${numberToColor(string.substring(18, 19))}-color)' stroke='#000000' points='-0.17445721583653,0.5544061302682 0.17369093231162,0.5544061302682 0.16168582375479,0.7183908045977 -0.16245210727969,0.7183908045977'/>
    <polygon fill='var(--rubik-${numberToColor(string.substring(19, 20))}-color)' stroke='#000000' points='0.19514687100894,0.5544061302682 0.54329501915709,0.5544061302682 0.50727969348659,0.7183908045977 0.18314176245211,0.7183908045977'/>
    
    <polygon fill='var(--rubik-${numberToColor(string.substring(23, 24))}-color)' stroke='#000000' points='0.5544061302682,-0.19514687100894 0.5544061302682,-0.54329501915709 0.7183908045977,-0.50727969348659 0.7183908045977,-0.18314176245211'/>
    <polygon fill='var(--rubik-${numberToColor(string.substring(22, 23))}-color)' stroke='#000000' points='0.5544061302682,0.17445721583653 0.5544061302682,-0.17369093231162 0.7183908045977,-0.16168582375479 0.7183908045977,0.16245210727969'/>
    <polygon fill='var(--rubik-${numberToColor(string.substring(29, 30))}-color)' stroke='#000000' points='0.5544061302682,0.54406130268199 0.5544061302682,0.19591315453384 0.7183908045977,0.18390804597701 0.7183908045977,0.50804597701149'/>
    
    <polygon fill='var(--rubik-${numberToColor(string.substring(47, 48))}-color)' stroke='#000000' points='-0.19514687100894,-0.5544061302682 -0.54329501915709,-0.5544061302682 -0.50727969348659,-0.7183908045977 -0.18314176245211,-0.7183908045977'/>
    <polygon fill='var(--rubik-${numberToColor(string.substring(46, 47))}-color)' stroke='#000000' points='0.17445721583653,-0.5544061302682 -0.17369093231162,-0.5544061302682 -0.16168582375479,-0.7183908045977 0.16245210727969,-0.7183908045977'/>
    <polygon fill='var(--rubik-${numberToColor(string.substring(45, 46))}-color)' stroke='#000000' points='0.54406130268199,-0.5544061302682 0.19591315453384,-0.5544061302682 0.18390804597701,-0.7183908045977 0.50804597701149,-0.7183908045977'/>
    
    <polygon fill='var(--rubik-${numberToColor(string.substring(53, 54))}-color)' stroke='#000000' points='-0.5544061302682,-0.54406130268199 -0.5544061302682,-0.19591315453384 -0.7183908045977,-0.18390804597701 -0.7183908045977,-0.50804597701149'/>
    <polygon fill='var(--rubik-${numberToColor(string.substring(54, 55))}-color)' stroke='#000000' points='-0.5544061302682,-0.17445721583653 -0.5544061302682,0.17369093231162 -0.7183908045977,0.16168582375479 -0.7183908045977,-0.16245210727969'/>
    <polygon fill='var(--rubik-${numberToColor(string.substring(55, 56))}-color)' stroke='#000000' points='-0.5544061302682,0.19514687100894 -0.5544061302682,0.54329501915709 -0.7183908045977,0.50727969348659 -0.7183908045977,0.18314176245211'/>
    </g>
</svg>
`;

async function paste(input) {
const text = await navigator.clipboard.readText();
input.value = text;
}

randomInt = (start, stop) => Math.round(Math.random() * (stop - start) + start);

generateScramble = (length) => {
let move = ["U", "D", "F", "B", "R", "L", "M", "E", "S", "x", "y", "z"];
let rotate = ["x", "y", "z"];
let turnCount = ["", "'", "2"];

let result = [];

for (let i = 0; i < length; i++) {
    result.push( move[randomInt(0, move.length - 1)] + turnCount[randomInt(0, turnCount.length - 1)] );
}

return result.join(" ");
}

addNewMove = () => {
let moves = [
    ["U", "D", "F", "B", "R", "L", "M", "E", "S"],
    ["U'", "D'", "F'", "B'", "R'", "L'", "M'", "E'", "S'"],
    ["U2", "D2", "F2", "B2", "R2", "L2", "M2", "E2", "S2"],
    ["u", "d", "f", "b", "r", "l", "x", "y", "z"],
    ["u'", "d'", "f'", "b'", "r'", "l'", "x'", "y'", "z'"],
    ["u2", "d2", "f2", "b2", "r2", "l2", "x2", "y2", "z2"],
];

for (let i = 0; i < moves.length; i++) {
    let btnGroup = document.createElement("div");
    btnGroup.setAttribute("class", "btnGroup");
    for (let j = 0; j < moves[i].length; j++) {
    let btn = document.createElement("button");
    btn.innerHTML = moves[i][j];
    btnGroup.appendChild( btn );
    btn.setAttribute("onclick", "move(this)");
    btn.setAttribute("class", "movement");
    }
    document.querySelector(".inp0").appendChild( btnGroup );
}
}

move = (e) => {
updateCube(turn( document.querySelector(".image").value.replace(/(_|\|)/g, ""), e.innerHTML ));
}

updateCube = (move) => {
if (document.querySelector(".img").dataset.state == "3d")
    func = stringImageTo3DImage;
else
    func = stringImageTo2DImage;

document.querySelector(".img").removeChild( document.querySelector(".img svg") );
document.querySelector(".img").insertAdjacentHTML( 'beforeend', func( move.replace(/(_|\|)/g, "") ) );
document.querySelector(".image").value = move;
}

const sleep = ms => new Promise(r => setTimeout(r, ms));