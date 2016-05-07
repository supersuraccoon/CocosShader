attribute vec4 a_position;

void main()
{
    gl_Position = CC_PMatrix * a_position;
}
