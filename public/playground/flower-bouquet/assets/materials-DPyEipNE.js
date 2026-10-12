import{En as e,On as t,b as n,c as r,et as i,it as a,l as o,ln as s,o as c,rn as l,rt as u,v as d}from"./util-mdhPWX3e.js";function f(e,t){let n=document.createElement(`canvas`);return n.width=e,n.height=t,n}function p(e,t,n,r,i){let a=e.getImageData(0,0,t,n),s=a.data;for(let e=0;e<n;e++)for(let n=0;n<t;n++){let a=(e*t+n)*4,l=1+r*(c(n/37,e/53,i,3)*.7+o(n/3,e/7,i+9)*.3);s[a]*=l,s[a+1]*=l,s[a+2]*=l}e.putImageData(a,0,0)}function m({spots:e=!1}={}){let t=f(256,256),n=t.getContext(`2d`),i=r(e?77:31);n.fillStyle=`#fff`,n.fillRect(0,0,256,256),n.lineCap=`round`;for(let e=0;e<46;e++){let t=(e+i()*.8)/46,r=256*(t*1.5-.25),a=256*(.5+(t-.5)*.35);n.strokeStyle=`rgba(0,0,0,${.05+i()*.09})`,n.lineWidth=.6+i()*1.2,n.beginPath(),n.moveTo(a,268.8),n.bezierCurveTo(a+(r-a)*.2,179.2,r+(i()-.5)*12,89.6,r,-4),n.stroke()}if(e){let e=n.createLinearGradient(0,0,256,0);e.addColorStop(.4,`rgba(120,150,40,0)`),e.addColorStop(.5,`rgba(120,150,40,0.28)`),e.addColorStop(.6,`rgba(120,150,40,0)`),n.fillStyle=e,n.fillRect(0,64,256,192);for(let e=0;e<150;e++){let e=i()**1.5*.62,t=256*(.5+(i()-.5)*(.25+e*.75)),r=256*(.92-e);n.fillStyle=`rgba(125,18,60,${.5+i()*.4})`,n.beginPath(),n.ellipse(t,r,1.6+i()*2.2,2.2+i()*3.4,0,0,Math.PI*2),n.fill()}}return p(n,256,256,.07,e?5:3),n.fillStyle=`#fff`,n.fillRect(0,246,10,10),t}function h(){let e=f(256,256),t=e.getContext(`2d`),n=r(11);t.fillStyle=`#c9c9c9`,t.fillRect(0,0,256,256),p(t,256,256,.14,21),t.lineCap=`round`,t.strokeStyle=`rgba(255,255,255,0.75)`,t.lineWidth=3.2,t.beginPath(),t.moveTo(128,256),t.lineTo(128,0),t.stroke();for(let e=0;e<11;e++){let r=256*(.95-e*.085);for(let e of[-1,1])t.strokeStyle=`rgba(255,255,255,${.35+n()*.2})`,t.lineWidth=1.5,t.beginPath(),t.moveTo(128,r),t.quadraticCurveTo(128+e*256*.25,r-12.8,128+e*256*.5,r-56.32),t.stroke()}return t.fillStyle=`#e4e4e4`,t.fillRect(0,246,10,10),e}function g(e,t,n){let r=f(128,128),i=r.getContext(`2d`),a=i.createImageData(128,128),o=a.data;for(let r=0;r<128;r++)for(let i=0;i<128;i++){let a=c(i/14,r/22,e,4)*.5+.5,s=Math.round(255*(t+(n-t)*a)),l=(r*128+i)*4;o[l]=o[l+1]=o[l+2]=s,o[l+3]=255}return i.putImageData(a,0,0),r}function _(){let e=f(512,512),t=e.getContext(`2d`),n=t.createImageData(512,512),r=n.data,i=[{cells:4,w:.7,seed:3},{cells:9,w:.3,seed:8}],a=(e,t,n)=>o(e*13.37+.5,t*7.77+.5,n)*.5+.5;for(let e=0;e<512;e++)for(let t=0;t<512;t++){let n=0,s=0;for(let r of i){let i=t/512*r.cells,o=e/512*r.cells,c=Math.floor(i),l=Math.floor(o),u=9,d=9,f=0,p=0;for(let e=-1;e<=1;e++)for(let t=-1;t<=1;t++){let n=c+t,s=l+e,m=(n%r.cells+r.cells)%r.cells,h=(s%r.cells+r.cells)%r.cells,g=n+a(m,h,r.seed),_=s+a(m,h,r.seed+1),v=Math.hypot(i-g,o-_);v<u?(d=u,u=v,f=a(m,h,r.seed+2)-.5,p=a(m,h,r.seed+3)-.5):v<d&&(d=v)}let m=Math.max(0,1-(d-u)*14);n+=r.w*(f*.9+m*m*f*2.6),s+=r.w*(p*.9+m*m*p*2.6)}n+=o(t/2.1,e/2.1,90)*.05,s+=o(t/2.1,e/2.1,91)*.05;let c=Math.hypot(n,s,1),l=(e*512+t)*4;r[l]=(n/c*.5+.5)*255,r[l+1]=(s/c*.5+.5)*255,r[l+2]=(1/c*.5+.5)*255,r[l+3]=255}return t.putImageData(n,0,0),e}function v(e,{srgb:t=!0,repeat:n=!1}={}){let r=new d(e);return r.colorSpace=t?s:``,n&&(r.wrapS=r.wrapT=l),r.anisotropy=4,r}var y={uWrapA:{value:new t(.25,.4,1.5,2)},uWrapB:{value:new t(1.2,2,1,.3)}},b=`#include <common>
varying vec3 vBq;`,x=`#include <begin_vertex>
#ifdef USE_INSTANCING
  vBq = ( instanceMatrix * vec4( transformed, 1.0 ) ).xyz;
#else
  vBq = transformed;
#endif`,S=`#include <common>
varying vec3 vBq;
uniform vec4 uWrapA;
uniform vec4 uWrapB;
float bqTri( float x ) { return 1.0 - abs( 2.0 * fract( x ) - 1.0 ); }
float bqRadius( float y, float ang, float k ) {
  float r = uWrapA.x + y * uWrapA.y;
  float env = ( 1.0 - exp( -y * 7.0 ) ) * exp( -y * 0.8 );
  r += env * ( uWrapA.x / 0.25 ) * ( 0.05 * bqTri( ang * 1.9 + k ) + 0.03 * bqTri( ang * 3.3 + 1.7 * k ) - 0.035 );
  r += 0.055 * y * ( bqTri( ang * 1.15 + k * 2.1 ) - 0.5 ) * ( 1.0 + uWrapA.y ) + 0.02 * y * ( bqTri( ang * 2.9 + k ) - 0.5 );
  return r;
}
// True where a leaf would be sticking out through the paper. Leaves may
// still hang a little way over the top edge (spill).
bool bqThroughPaper( vec3 p ) {
  if ( p.y < 0.02 ) return false;
  const float spill = 0.12;
  float a = atan( p.x, p.z );
  float rr = length( p.xz );
  float margin = 0.06 + 0.03 * p.y;
  float sF = ( a - 0.12 ) / 1.8;
  float topF = uWrapA.z * ( 0.92 + 0.2 * pow( min( abs( sF ), 1.0 ), 1.6 ) );
  float t = clamp( ( p.y + uWrapB.x ) / ( topF + uWrapB.x ), 0.0, 1.0 );
  sF = ( a - 0.12 ) / mix( 2.05, 1.6, t );
  if ( abs( sF ) <= 1.0 && p.y < topF - spill && rr > bqRadius( p.y, a, 1.0 ) + 0.016 - margin ) return true;
  float ab = a < 0.0 ? a + 6.2831853 : a;
  float sB = ( ab - 3.14159265 ) / 2.8;
  float topB = uWrapA.w * ( 1.0 - 0.5 * pow( abs( sB ), 2.2 ) );
  if ( abs( sB ) <= 1.0 && p.y < topB - spill && rr > bqRadius( p.y, ab, 0.0 ) - margin ) return true;
  return false;
}
// Cheap occlusion: stems and leaves get darker the deeper they sit under
// the dome of flower heads.
float bqShade( vec3 p ) {
  float dome = uWrapB.y - uWrapB.w * dot( p.xz, p.xz ) / uWrapB.z;
  return mix( 0.3, 1.0, smoothstep( -1.25, -0.1, p.y - dome ) );
}`;function C(e,{transl:t=0,clip:n=!1,shade:r=!1}={}){return e.userData.clip=n,e.onBeforeCompile=e=>{(n||r)&&(e.uniforms.uWrapA=y.uWrapA,e.uniforms.uWrapB=y.uWrapB,e.vertexShader=e.vertexShader.replace(`#include <common>`,b).replace(`#include <begin_vertex>`,x),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,S),n&&(e.fragmentShader=e.fragmentShader.replace(`void main() {`,`void main() {
  if ( bqThroughPaper( vBq ) ) discard;`)),r&&(e.fragmentShader=e.fragmentShader.replace(`#include <color_fragment>`,`#include <color_fragment>
  diffuseColor.rgb *= bqShade( vBq );`))),t&&(e.uniforms.uTransl={value:t},e.fragmentShader=e.fragmentShader.replace(`#include <lights_physical_pars_fragment>`,`#include <lights_physical_pars_fragment>
        uniform float uTransl;
        void RE_Direct_Thin( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
          RE_Direct_Physical( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
          float back = saturate( dot( -geometryNormal, directLight.direction ) );
          reflectedLight.directDiffuse += back * uTransl * directLight.color * material.diffuseColor * RECIPROCAL_PI;
        }
        #undef RE_Direct
        #define RE_Direct RE_Direct_Thin`))},e.customProgramCacheKey=()=>`plant:${+!!t}${+!!n}${+!!r}`,e}function w(){let t=v(m()),r=v(m({spots:!0})),o=v(h()),s=v(g(4,.72,1),{srgb:!1,repeat:!0}),c=(e,n=.45,r=t,i={})=>C(new u({vertexColors:!0,map:r,bumpMap:r,bumpScale:.6,roughnessMap:s,side:2,sheenRoughness:.55,...e}),{transl:n,...i}),l={rose:c({roughness:.6,sheen:.3,sheenColor:new n(`#d8405f`)},.3),peony:c({roughness:.66,sheen:.22,sheenColor:new n(`#f7b6cb`)},.5),tulip:c({roughness:.42,sheen:.25,sheenColor:new n(`#ffd9b0`)},.5),lily:c({roughness:.45,sheen:.3,sheenColor:new n(`#ffffff`)},.5,r),sunflower:c({roughness:.7,sheen:.15,sheenColor:new n(`#f6c84a`)},.3),daisy:c({roughness:.6,sheen:.3,sheenColor:new n(`#ffffff`)},.5),lavender:c({roughness:.85,sheen:.6,sheenColor:new n(`#c9b8ff`),bumpScale:0},.15),eucalyptus:c({roughness:.78,sheen:.8,sheenColor:new n(`#dfeee8`),sheenRoughness:.7,map:o,bumpMap:o},.3,o,{clip:!0})},d=c({roughness:.6,sheen:.3,sheenColor:new n(`#ffffff`)},.5,t,{clip:!0}),f=c({roughness:.5,sheen:.2,sheenColor:new n(`#cfe8b0`),map:o,bumpMap:o,bumpScale:.8},.4,o,{clip:!0,shade:!0}),p=C(new i,{clip:!0}),y=v(_(),{srgb:!1,repeat:!0}),b=new a({roughness:.94,metalness:0,normalMap:y,normalScale:new e(.6,.6),side:0,envMapIntensity:.6}),x=new a({roughness:.97,metalness:0,normalMap:y,normalScale:new e(.5,.5),side:1,envMapIntensity:.6});return b.shadowSide=2,{heads:l,green:f,breath:d,clipDepth:p,paperOuter:b,paperInner:x,ribbon:new u({roughness:.34,metalness:0,sheen:1,sheenRoughness:.3,anisotropy:.6,side:2})}}export{w as createMaterials,y as wrapUniforms};