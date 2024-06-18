from urllib.request import Request

from fastapi import FastAPI, APIRouter
from starlette import status
from starlette.staticfiles import StaticFiles
from starlette.responses import FileResponse, RedirectResponse, HTMLResponse
from api.auth import auth_router
from api.lectures import lecture_router
from api.map import map_router
from api.practices import practice_router
from api.tasks import task_router
from api.db_main import db_router
from api.users import user_router
from api.auth import COOKIE_SESSION_ID_KEY, is_accessible, Access
'''
app = FastAPI(title="api app")


main_router = APIRouter()
main_router.include_router(task_router)
main_router.include_router(db_router)
main_router.include_router(user_router)
main_router.include_router(practice_router)
main_router.include_router(lecture_router)
main_router.include_router(auth_router)
main_router.include_router(map_router)
app.include_router(main_router)

app.mount("/", StaticFiles(directory="front", html=True), name="front")
#subapi = FastAPI(title="main app")
#app.mount("/api", subapi)
#subapi.mount("/", StaticFiles(directory="front", html=True), name="front")
'''

subapp = FastAPI(title="main app")
styles = FastAPI(title="styles")
scripts = FastAPI(title="scripts")
components = FastAPI(title="components")
svg = FastAPI(title="svg")
data = FastAPI(title="data")

@styles.get("/{path:path}")
@styles.get("/{path}")
async def html_landing(path) -> FileResponse:
    return FileResponse('front/styles/'+ path)

@data.get("/{path:path}")
@data.get("/{path}")
async def html_landing(path) -> FileResponse:
    return FileResponse('data/'+ path)

@scripts.get("/{path:path}")
async def html_landing(path) -> FileResponse:
    return FileResponse('front/scripts/'+ path)

@components.get("/{path:path}")
async def html_landing(path) -> FileResponse:
    print("HERE" +  path)
    return FileResponse('front/components/'+ path)

@svg.get("/{path:path}")
async def html_landing(path) -> FileResponse:
    print("HERE" +  path)
    return FileResponse('front/svg/'+ path)

@subapp.get("/{path}")
async def html_landing(path) -> HTMLResponse:
    print("HERE" +  path)
    return FileResponse('front/'+ path)


app = FastAPI(title="api app")

main_router = APIRouter()
main_router.include_router(task_router)
main_router.include_router(db_router)
main_router.include_router(user_router)
main_router.include_router(practice_router)
main_router.include_router(lecture_router)
main_router.include_router(auth_router)
main_router.include_router(map_router)
app.include_router(main_router)

app.mount("/styles", styles)
app.mount("/scripts", scripts)
app.mount("/svg", svg)
app.mount("/components", components)
app.mount("/data", data)
app.mount("/", subapp)


@app.get('/')
async def index():
    return FileResponse('front/auth.html')


def check_permission(method, api, session_id):
    print(method, api, session_id)
    # The following paths are always allowed:
    if api[1:] in ['docs', 'openapi.json', 'favicon.ico']:
    #if method == 'GET' and api[1:] in ['docs', 'openapi.json', 'favicon.ico']:
        return '200'
    # Parse auth header and check scheme, username and password

    print(api.split('/'))
    if api.split('/')[0] in ['components', 'styles', "scripts", "svg", "auth", "lectures", "script", "map", "tasks", "users",  "lectures"]:
        print("HERE")
        return '200'

    if api == '/auth.html':
        return '200'

    auth = ''
    if session_id == "" or is_accessible(Access.USR, session_id) == "":
        auth = '307'

    if api not in ["/auth.html", "/account.html", "/information_change.html", "/lecture.html", "/map.html", "/pass_change.html", "/practice.html", "/practice_answer.html", "/statistic.html", "/test.html", "/test_result.html"]:
        return '404'

    return auth
'''
@app.middleware("http")
async def modify_request_response_middleware(request: Request, call_next, ):
    session_id: str = request.cookies.get(COOKIE_SESSION_ID_KEY)
    if (session_id == None):
        session_id = ""
    code = check_permission(request.method, request.url.path, session_id)
    print(code)
    #print(session_id)
    if code == '307':
        print("FALSE")
        url1 = '/?continue=' + request.url.path
        print(url1)
        return RedirectResponse(url=url1,  status_code=status.HTTP_307_TEMPORARY_REDIRECT)
    if code == '404':
        return RedirectResponse("/404", status_code=status.HTTP_404_NOT_FOUND)
    print("TRUE")
    return await call_next(request)
'''