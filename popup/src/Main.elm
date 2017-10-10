port module Main exposing (..)

import Model exposing (Model)
import Html exposing (Html)
import Html.Attributes


-- PORTS FROM JAVASCRIPT


port onState : (Model -> msg) -> Sub msg


init : Model -> ( Model, Cmd Msg )
init model =
    ( model
    , Cmd.none
    )


type Msg
    = NoOp
    | NewState Model


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NoOp ->
            ( model, Cmd.none )

        NewState newModel ->
            ( newModel, Cmd.none )


view : Model -> Html Msg
view model =
    Html.div
        [ Html.Attributes.style
            [ ( "width", "200px" )
            , ( "height", "100px" )
            ]
        ]
        [ Html.text ("[PopUp] clicks: " ++ toString model.clicks)
        ]


subscriptions : Model -> Sub Msg
subscriptions model =
    onState NewState


main : Program Model Model Msg
main =
    Html.programWithFlags
        { init = init
        , update = update
        , view = view
        , subscriptions = subscriptions
        }
