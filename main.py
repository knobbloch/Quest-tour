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
    return FileResponse('front/components/'+ path)

@svg.get("/{path:path}")
async def html_landing(path) -> FileResponse:
    return FileResponse('front/svg/'+ path)

@subapp.get("/{path}")
async def html_landing(path) -> HTMLResponse:
    return FileResponse('front/'+ path + ".html")


app = FastAPI(title="api app")

@app.get('/')
async def index():
    print("QWEWQEWQ")
    return FileResponse('front/auth.html')


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


def check_permission(method, api, session_id):
    print(method, api, session_id)
    # The following paths are always allowed:
    if api[1:] in ['docs', 'openapi.json', 'favicon.ico']:
    #if method == 'GET' and api[1:] in ['docs', 'openapi.json', 'favicon.ico']:
        return '200'
    # Parse auth header and check scheme, username and password

    #print(api.split('/'))
    if api.split('/')[1] in ['components', 'styles', "scripts", "svg", "script"]:
        return '200'

    if api == '/auth' or api == "" or api == "/":
        return '200'

    if session_id == "" or is_accessible(Access.ALL, session_id) == "":
        return '307'

    in_usr = True if api in ["/auth", "/account", "/information_change", "/lecture", "/map", "/pass_change", "/practice", "/practice_answer", "/statistic", "/test", "/test_result"] else False
    in_adm = True if api in ["/admin_account", "/admin_add_user", "/admin_information_change", "/admin_lecture", "/admin_pass_change", "/admin_statistic", "/admin_users_account", "/admin_user_information_change", "/create_lecture", "/create_practice", "/create_test",
                     "/edit_lecture", "/edit_test", "/information_change", "/pass_change", "/user_list", "/task_list", "/practice_answer_list", "/practice_answer"] else False

    if in_usr and is_accessible(Access.USR, session_id) != "":
        return '200'
    if in_adm and is_accessible(Access.ADM, session_id) != "":
        return '200'
    if in_adm or in_usr:
        return '403'
    else:
        return '404'



@app.middleware("http")
async def modify_request_response_middleware(request: Request, call_next, ):
    session_id: str = request.cookies.get(COOKIE_SESSION_ID_KEY)
    if (session_id == None):
        session_id = ""
    code = check_permission(request.method, request.url.path, session_id)
    print(code)
    if code == '307':
        url1 = '/auth?continue=' + request.url.path
        return RedirectResponse(url=url1,  status_code=status.HTTP_307_TEMPORARY_REDIRECT)
    if code == '403':
        return RedirectResponse('/auth',  status_code=status.HTTP_403_FORBIDDEN)
    if code == '404':
        return RedirectResponse("/404", status_code=status.HTTP_404_NOT_FOUND)
    return await call_next(request)
